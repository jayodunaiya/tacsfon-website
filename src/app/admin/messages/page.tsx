"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiInbox,
  FiMail,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

type FilterType = "all" | "unread" | "read";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatFullDate = (date: string) => {
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const AdminMessagesPage = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const [messageToDelete, setMessageToDelete] =
    useState<ContactMessage | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  /* ==========================================
     AUTH
  ========================================== */

  const checkAdmin = useCallback(async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.replace("/admin/login");
      return false;
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError || !isAdmin) {
      await supabase.auth.signOut();
      router.replace("/admin/login");
      return false;
    }

    return true;
  }, [router]);

  /* ==========================================
     FETCH MESSAGES
  ========================================== */

  const fetchMessages = useCallback(async () => {
    setError("");

    const { data, error: fetchError } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Unable to fetch messages:", fetchError);
      setError("Unable to load messages.");
      return;
    }

    setMessages(data ?? []);
  }, []);

  /* ==========================================
     INITIAL LOAD
  ========================================== */

  useEffect(() => {
    const initialise = async () => {
      setIsLoading(true);

      const authorised = await checkAdmin();

      if (!authorised) {
        setIsLoading(false);
        return;
      }

      await fetchMessages();
      setIsLoading(false);
    };

    initialise();
  }, [checkAdmin, fetchMessages]);

  /* ==========================================
     BODY SCROLL LOCK
  ========================================== */

  useEffect(() => {
    const shouldLock =
      selectedMessage !== null || messageToDelete !== null;

    if (!shouldLock) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMessage, messageToDelete]);

  /* ==========================================
     KEYBOARD CLOSE
  ========================================== */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (messageToDelete) {
        setMessageToDelete(null);
        return;
      }

      if (selectedMessage) {
        setSelectedMessage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [messageToDelete, selectedMessage]);

  /* ==========================================
     OPEN MESSAGE
  ========================================== */

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);

    if (message.is_read) return;

    setMessages((current) =>
      current.map((item) =>
        item.id === message.id
          ? { ...item, is_read: true }
          : item
      )
    );

    setSelectedMessage({
      ...message,
      is_read: true,
    });

    const { error: updateError } = await supabase
      .from("contact_messages")
      .update({
        is_read: true,
      })
      .eq("id", message.id);

    if (updateError) {
      console.error(
        "Unable to mark message as read:",
        updateError
      );

      setMessages((current) =>
        current.map((item) =>
          item.id === message.id
            ? { ...item, is_read: false }
            : item
        )
      );

      setSelectedMessage((current) =>
        current?.id === message.id
          ? { ...current, is_read: false }
          : current
      );
    }
  };

  /* ==========================================
     TOGGLE READ STATUS
  ========================================== */

  const toggleReadStatus = async () => {
    if (!selectedMessage) return;

    const newStatus = !selectedMessage.is_read;

    setSelectedMessage({
      ...selectedMessage,
      is_read: newStatus,
    });

    setMessages((current) =>
      current.map((message) =>
        message.id === selectedMessage.id
          ? {
              ...message,
              is_read: newStatus,
            }
          : message
      )
    );

    const { error: updateError } = await supabase
      .from("contact_messages")
      .update({
        is_read: newStatus,
      })
      .eq("id", selectedMessage.id);

    if (updateError) {
      console.error(
        "Unable to update read status:",
        updateError
      );

      setSelectedMessage({
        ...selectedMessage,
        is_read: !newStatus,
      });

      setMessages((current) =>
        current.map((message) =>
          message.id === selectedMessage.id
            ? {
                ...message,
                is_read: !newStatus,
              }
            : message
        )
      );
    }
  };

  /* ==========================================
     DELETE MESSAGE
  ========================================== */

  const deleteMessage = async () => {
    if (!messageToDelete) return;

    setIsDeleting(true);

    const { error: deleteError } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", messageToDelete.id);

    if (deleteError) {
      console.error(
        "Unable to delete message:",
        deleteError
      );

      setError("Unable to delete this message.");
      setIsDeleting(false);
      return;
    }

    setMessages((current) =>
      current.filter(
        (message) => message.id !== messageToDelete.id
      )
    );

    if (selectedMessage?.id === messageToDelete.id) {
      setSelectedMessage(null);
    }

    setMessageToDelete(null);
    setIsDeleting(false);
  };

  /* ==========================================
     REFRESH
  ========================================== */

  const refreshMessages = async () => {
    setIsRefreshing(true);
    await fetchMessages();
    setIsRefreshing(false);
  };

  /* ==========================================
     COUNTS
  ========================================== */

  const totalMessages = messages.length;

  const unreadMessages = messages.filter(
    (message) => !message.is_read
  ).length;

  const readMessages = totalMessages - unreadMessages;

  /* ==========================================
     FILTER
  ========================================== */

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return messages.filter((message) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "unread"
            ? !message.is_read
            : message.is_read;

      if (!matchesFilter) return false;

      if (!query) return true;

      return (
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      );
    });
  }, [messages, search, filter]);

  /* ==========================================
     LOADING
  ========================================== */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#E9EDE5] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-green-700" />

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-black/40">
                Loading Messages
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#E9EDE5] px-4 pb-20 pt-6 sm:px-7 sm:pt-8 lg:px-10 lg:pb-24 lg:pt-10">

        <div className="mx-auto max-w-[1500px]">

          {/* ======================================
              HEADER
          ====================================== */}

          <header className="relative overflow-hidden bg-black px-6 py-10 text-white sm:px-9 sm:py-12 lg:px-12 lg:py-14">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-5 -top-10 select-none text-[140px] font-semibold leading-none tracking-[-0.08em] text-white/[0.04] sm:text-[190px]"
            >
              INBOX
            </div>

            <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

              <div>

                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-green-400" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-400">
                    Contact Inbox
                  </p>
                </div>

                <h1 className="mt-5 text-5xl font-medium tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Messages
                  <span className="text-green-500">.</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
                  Enquiries and messages submitted through
                  the TACSFON LAUTECH website.
                </p>

              </div>

              <button
                type="button"
                onClick={refreshMessages}
                disabled={isRefreshing}
                className="group flex w-fit items-center gap-3 border border-white/15 bg-white/[0.06] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-green-500 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiRefreshCw
                  className={
                    isRefreshing ? "animate-spin" : ""
                  }
                />

                {isRefreshing ? "Refreshing" : "Refresh"}
              </button>

            </div>

          </header>

          {/* ======================================
              STATS
          ====================================== */}

          <section className="grid sm:grid-cols-3">

            {/* TOTAL */}

            <div className="relative overflow-hidden bg-green-700 p-7 text-white sm:p-8 lg:p-9">

              <div
                aria-hidden="true"
                className="absolute -bottom-7 -right-2 text-[100px] font-semibold leading-none text-white/[0.06]"
              >
                ALL
              </div>

              <div className="relative z-10">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Total Messages
                </p>

                <p className="mt-7 text-5xl font-medium tracking-[-0.05em]">
                  {totalMessages
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

            </div>

            {/* UNREAD */}

            <div className="relative overflow-hidden bg-[#D4DFD0] p-7 sm:p-8 lg:p-9">

              <div className="relative z-10">

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-700" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Unread
                  </p>
                </div>

                <p className="mt-7 text-5xl font-medium tracking-[-0.05em] text-green-800">
                  {unreadMessages
                    .toString()
                    .padStart(2, "0")}
                </p>

              </div>

            </div>

            {/* READ */}

            <div className="relative overflow-hidden bg-[#171717] p-7 text-white sm:p-8 lg:p-9">

              <div
                aria-hidden="true"
                className="absolute -bottom-6 -right-1 text-[100px] font-semibold leading-none text-white/[0.035]"
              >
                OK
              </div>

              <div className="relative z-10">

                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Read
                </p>

                <p className="mt-7 text-5xl font-medium tracking-[-0.05em] text-white/75">
                  {readMessages
                    .toString()
                    .padStart(2, "0")}
                </p>

              </div>

            </div>

          </section>

          {/* ======================================
              INBOX CONTAINER
          ====================================== */}

          <div className="mt-7 bg-[#F6F7F2] p-4 sm:p-6 lg:p-8">

            {/* ======================================
                CONTROLS
            ====================================== */}

            <section className="flex flex-col gap-5 border-b border-black/10 pb-6 lg:flex-row lg:items-center lg:justify-between">

              {/* FILTERS */}

              <div className="flex flex-wrap gap-2">

                {(
                  [
                    ["all", "All"],
                    ["unread", "Unread"],
                    ["read", "Read"],
                  ] as const
                ).map(([value, label]) => {
                  const active = filter === value;

                  const count =
                    value === "all"
                      ? totalMessages
                      : value === "unread"
                        ? unreadMessages
                        : readMessages;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFilter(value)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                        active
                          ? "bg-green-700 text-white"
                          : "bg-[#E6E9E2] text-black/45 hover:bg-black hover:text-white"
                      }`}
                    >
                      {label}

                      <span
                        className={
                          active
                            ? "text-white/55"
                            : "text-black/30"
                        }
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}

              </div>

              {/* SEARCH */}

              <div className="relative w-full lg:max-w-sm">

                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search messages..."
                  className="w-full border border-black/10 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/25 focus:border-green-700"
                />

              </div>

            </section>

            {/* ERROR */}

            {error && (
              <div className="mt-6 border-l-2 border-black bg-[#ECEEE8] px-5 py-4">
                <p className="text-xs leading-6 text-black/60">
                  {error}
                </p>
              </div>
            )}

            {/* ======================================
                MESSAGE LIST
            ====================================== */}

            <section className="mt-7">

              {filteredMessages.length === 0 ? (
                <div className="flex min-h-[380px] items-center justify-center bg-[#E8ECE4] px-6">

                  <div className="max-w-sm text-center">

                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl text-white">
                      <FiInbox />
                    </span>

                    <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em]">
                      {messages.length === 0
                        ? "No messages yet."
                        : "Nothing found."}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-black/40">
                      {messages.length === 0
                        ? "Messages submitted through the contact page will appear here."
                        : "Try changing your search or message filter."}
                    </p>

                  </div>

                </div>
              ) : (
                <div className="border-t border-black/10">

                  {filteredMessages.map((message) => (
                    <button
                      key={message.id}
                      type="button"
                      onClick={() => openMessage(message)}
                      className={`group relative grid w-full gap-4 border-b border-black/10 py-6 text-left transition sm:px-5 lg:grid-cols-[220px_1fr_140px_30px] lg:items-center ${
                        !message.is_read
                          ? "bg-white shadow-[inset_3px_0_0_#15803d]"
                          : "bg-[#E9ECE5] hover:bg-[#FDFDFB]"
                      }`}
                    >

                      {/* PERSON */}

                      <div className="flex min-w-0 items-center gap-4 px-4 sm:px-0">

                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            !message.is_read
                              ? "bg-green-700"
                              : "bg-black/15"
                          }`}
                        />

                        <div className="min-w-0">

                          <p
                            className={`truncate text-sm ${
                              !message.is_read
                                ? "font-semibold text-black"
                                : "font-medium text-black/55"
                            }`}
                          >
                            {message.name}
                          </p>

                          <p className="mt-1 truncate text-[10px] text-black/35">
                            {message.email}
                          </p>

                        </div>

                      </div>

                      {/* MESSAGE PREVIEW */}

                      <div className="min-w-0 px-10 sm:px-0">

                        <p
                          className={`truncate text-sm ${
                            !message.is_read
                              ? "font-medium text-black"
                              : "text-black/55"
                          }`}
                        >
                          {message.subject}
                        </p>

                        <p className="mt-1 truncate text-xs text-black/35">
                          {message.message}
                        </p>

                      </div>

                      {/* DATE */}

                      <p className="px-10 text-[9px] font-medium uppercase tracking-[0.1em] text-black/35 sm:px-0">
                        {formatDate(message.created_at)}
                      </p>

                      <FiChevronRight className="hidden text-black/25 transition-all group-hover:translate-x-1 group-hover:text-green-700 lg:block" />

                    </button>
                  ))}

                </div>
              )}

            </section>

          </div>

        </div>

      </main>

      {/* ==========================================
          MESSAGE DRAWER
      ========================================== */}

      {selectedMessage && (
        <div className="fixed inset-0 z-[100]">

          {/* OVERLAY */}

          <button
            type="button"
            aria-label="Close message"
            onClick={() => setSelectedMessage(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
          />

          {/* DRAWER */}

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-[#EEF1EA] shadow-2xl">

            {/* HEADER */}

            <div className="relative overflow-hidden bg-black px-6 py-6 text-white sm:px-8">

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -top-5 text-[100px] font-semibold leading-none tracking-[-0.07em] text-white/[0.035]"
              >
                MAIL
              </div>

              <div className="relative z-10 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span
                    className={`h-2 w-2 rounded-full ${
                      selectedMessage.is_read
                        ? "bg-white/25"
                        : "bg-green-400"
                    }`}
                  />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Contact Message
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-700"
                  aria-label="Close"
                >
                  <FiX />
                </button>

              </div>

            </div>

            {/* BODY */}

            <div className="flex-1 overflow-y-auto">

              {/* SENDER */}

              <div className="bg-[#D8E2D3] px-6 py-9 sm:px-8 lg:px-10">

                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-green-800">
                  {selectedMessage.subject}
                </p>

                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
                  {selectedMessage.name}
                </h2>

                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-black/50 transition hover:text-green-700"
                >
                  <FiMail className="text-xs" />
                  {selectedMessage.email}
                </a>

                <p className="mt-5 text-[9px] uppercase tracking-[0.14em] text-black/35">
                  {formatFullDate(
                    selectedMessage.created_at
                  )}
                </p>

              </div>

              {/* MESSAGE */}

              <div className="px-6 py-10 sm:px-8 lg:px-10">

                <div className="flex items-center gap-3">
                  <span className="h-px w-7 bg-green-700" />

                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-800">
                    Message
                  </p>
                </div>

                <p className="mt-7 whitespace-pre-wrap text-base leading-8 text-black/70 sm:text-lg sm:leading-9">
                  {selectedMessage.message}
                </p>

              </div>

            </div>

            {/* ======================================
                ACTIONS
            ====================================== */}

            <div className="border-t border-black/10 bg-[#DDE3D9] p-5 sm:p-6">

              <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">

                {/* REPLY */}

                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    `Re: ${selectedMessage.subject}`
                  )}`}
                  className="group flex items-center justify-between bg-green-700 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
                >
                  Reply via Email

                  <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                {/* READ / UNREAD */}

                <button
                  type="button"
                  onClick={toggleReadStatus}
                  className="flex items-center justify-center gap-2 border border-black/10 bg-[#F6F7F2] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] transition hover:border-black hover:bg-black hover:text-white"
                >
                  {selectedMessage.is_read ? (
                    <>
                      <FiMail />
                      Mark Unread
                    </>
                  ) : (
                    <>
                      <FiCheck />
                      Mark Read
                    </>
                  )}
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() =>
                    setMessageToDelete(selectedMessage)
                  }
                  className="flex items-center justify-center gap-2 border border-red-200 bg-[#F6F7F2] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>

          </aside>

        </div>
      )}

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      {messageToDelete && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-5">

          <button
            type="button"
            aria-label="Cancel delete"
            onClick={() => {
              if (!isDeleting) {
                setMessageToDelete(null);
              }
            }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-md overflow-hidden bg-[#EEF1EA]">

            {/* TOP */}

            <div className="bg-black p-7 text-white sm:p-9">

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                <FiTrash2 />
              </span>

              <h3 className="mt-7 text-3xl font-medium tracking-[-0.035em]">
                Delete message?
              </h3>

            </div>

            {/* CONTENT */}

            <div className="p-7 sm:p-9">

              <p className="text-sm leading-7 text-black/50">
                This will permanently delete the message from{" "}
                <span className="font-medium text-black">
                  {messageToDelete.name}
                </span>
                . This action cannot be undone.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() =>
                    setMessageToDelete(null)
                  }
                  className="border border-black/15 bg-transparent px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] transition hover:bg-black hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={deleteMessage}
                  className="flex items-center justify-center gap-2 bg-red-600 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiTrash2 />

                  {isDeleting
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default AdminMessagesPage;