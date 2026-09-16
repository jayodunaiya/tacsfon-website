"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiCalendar,
  FiEdit2,
  FiExternalLink,
  FiImage,
  FiLogOut,
  FiMapPin,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event.types";

const EVENT_CATEGORIES = [
  "Service",
  "Conference",
  "Fellowship",
  "Outreach",
  "Prayer",
  "Academic",
  "Others",
];

const AdminEventsPage = () => {
  const router = useRouter();

  // ==========================================
  // EVENTS
  // ==========================================
  const [events, setEvents] =
    useState<Event[]>([]);

  const [isCheckingAuth, setIsCheckingAuth] =
    useState(true);

  // ==========================================
  // CREATE EVENT
  // ==========================================
  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("Service");

  const [
    customCategory,
    setCustomCategory,
  ] = useState("");

  const [eventDate, setEventDate] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [
    registrationUrl,
    setRegistrationUrl,
  ] = useState("");

  const [featured, setFeatured] =
    useState(false);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState<string | null>(
    null
  );

  const [isLoading, setIsLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // ==========================================
  // EDIT EVENT
  // ==========================================
  const [
    editingEvent,
    setEditingEvent,
  ] = useState<Event | null>(
    null
  );

  const [editTitle, setEditTitle] =
    useState("");

  const [
    editCategory,
    setEditCategory,
  ] = useState("");

  const [
    editCustomCategory,
    setEditCustomCategory,
  ] = useState("");

  const [
    editEventDate,
    setEditEventDate,
  ] = useState("");

  const [
    editStartTime,
    setEditStartTime,
  ] = useState("");

  const [
    editLocation,
    setEditLocation,
  ] = useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  const [
    editRegistrationUrl,
    setEditRegistrationUrl,
  ] = useState("");

  const [
    editFeatured,
    setEditFeatured,
  ] = useState(false);

  const [
    editImageFile,
    setEditImageFile,
  ] = useState<File | null>(
    null
  );

  const [
    editImagePreview,
    setEditImagePreview,
  ] = useState<string | null>(
    null
  );

  const [isEditing, setIsEditing] =
    useState(false);

  // ==========================================
  // DELETE
  // ==========================================
  const [
    eventToDelete,
    setEventToDelete,
  ] = useState<Event | null>(
    null
  );

  const [isDeleting, setIsDeleting] =
    useState(false);

  // ==========================================
  // FETCH EVENTS
  // ==========================================
  const fetchEvents = async () => {
    const { data, error } =
      await supabase
        .from("events")
        .select("*")
        .order("event_date", {
          ascending: true,
        });

    if (error) {
      console.error(error);

      setMessage(
        "Unable to fetch events."
      );

      return;
    }

    setEvents(data ?? []);
  };

  // ==========================================
  // AUTHENTICATION
  // ==========================================
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        router.push(
          "/admin/login"
        );

        return;
      }

      const {
        data: isAdmin,
        error,
      } =
        await supabase.rpc(
          "is_admin"
        );

      if (
        error ||
        !isAdmin
      ) {
        await supabase.auth.signOut();

        router.push(
          "/admin/login"
        );

        return;
      }

      await fetchEvents();

      setIsCheckingAuth(false);
    };

    checkUser();
  }, [router]);

  // ==========================================
  // CREATE IMAGE PREVIEW
  // ==========================================
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ??
      null;

    if (!file) {
      setImageFile(null);
      setImagePreview(null);

      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setMessage(
        "Please select a valid image."
      );

      return;
    }

    setImageFile(file);

    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);
  };

  // ==========================================
  // EDIT IMAGE PREVIEW
  // ==========================================
  const handleEditImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ??
      null;

    if (!file) {
      setEditImageFile(null);
      setEditImagePreview(
        null
      );

      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setMessage(
        "Please select a valid image."
      );

      return;
    }

    setEditImageFile(file);

    const preview =
      URL.createObjectURL(file);

    setEditImagePreview(
      preview
    );
  };

  // ==========================================
  // CLEAN PREVIEW URL
  // ==========================================
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    return () => {
      if (editImagePreview) {
        URL.revokeObjectURL(
          editImagePreview
        );
      }
    };
  }, [editImagePreview]);

  // ==========================================
  // LOCK PAGE WHEN MODAL IS OPEN
  // ==========================================
  useEffect(() => {
    if (
      !editingEvent &&
      !eventToDelete
    ) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      if (
        isEditing ||
        isDeleting
      ) {
        return;
      }

      if (eventToDelete) {
        setEventToDelete(
          null
        );

        return;
      }

      setEditingEvent(null);
      setEditImageFile(null);
      setEditImagePreview(
        null
      );
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    editingEvent,
    eventToDelete,
    isEditing,
    isDeleting,
  ]);

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (
    date: string
  ) => {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT TIME
  // ==========================================
  const formatTime = (
    time: string | null
  ) => {
    if (!time) return null;

    const [hours, minutes] =
      time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // ==========================================
  // CLEAN FILE NAME
  // ==========================================
  const createCleanTitle = (
    value: string
  ) => {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /(^-|-$)/g,
        ""
      );
  };

  // ==========================================
  // CREATE EVENT
  // ==========================================
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");

    const finalCategory =
      category === "Others"
        ? customCategory.trim()
        : category;

    if (
      category === "Others" &&
      !customCategory.trim()
    ) {
      setMessage(
        "Please enter the event category."
      );

      return;
    }

    if (!imageFile) {
      setMessage(
        "Please select an event flyer."
      );

      return;
    }

    setIsLoading(true);

    let imagePath = "";

    try {
      const timestamp =
        Date.now();

      const cleanTitle =
        createCleanTitle(
          title
        );

      const extension =
        imageFile.name
          .split(".")
          .pop()
          ?.toLowerCase();

      if (!extension) {
        throw new Error(
          "Unable to determine the flyer file type."
        );
      }

      imagePath =
        `flyers/${timestamp}-${cleanTitle}.${extension}`;

      // ======================================
      // UPLOAD FLYER
      // ======================================
      const {
        error:
          imageUploadError,
      } =
        await supabase.storage
          .from("events")
          .upload(
            imagePath,
            imageFile,
            {
              cacheControl:
                "3600",

              upsert: false,
            }
          );

      if (
        imageUploadError
      ) {
        throw imageUploadError;
      }

      // ======================================
      // PUBLIC FLYER URL
      // ======================================
      const {
        data:
          imagePublicUrlData,
      } =
        supabase.storage
          .from("events")
          .getPublicUrl(
            imagePath
          );

      const imageUrl =
        imagePublicUrlData.publicUrl;

      // ======================================
      // REMOVE OLD FEATURED EVENT
      // ======================================
      if (featured) {
        const {
          error:
            featuredError,
        } =
          await supabase
            .from("events")
            .update({
              featured:
                false,
            })
            .eq(
              "featured",
              true
            );

        if (
          featuredError
        ) {
          await supabase.storage
            .from("events")
            .remove([
              imagePath,
            ]);

          throw featuredError;
        }
      }

      // ======================================
      // INSERT EVENT
      // ======================================
      const {
        error:
          insertError,
      } =
        await supabase
          .from("events")
          .insert({
            title:
              title.trim(),

            category:
              finalCategory,

            event_date:
              eventDate,

            start_time:
              startTime ||
              null,

            location:
              location.trim(),

            description:
              description.trim() ||
              null,

            image_url:
              imageUrl,

            image_path:
              imagePath,

            registration_url:
              registrationUrl.trim() ||
              null,

            featured,
          });

      if (insertError) {
        await supabase.storage
          .from("events")
          .remove([
            imagePath,
          ]);

        throw insertError;
      }

      // ======================================
      // RESET
      // ======================================
      setTitle("");
      setCategory("Service");
      setCustomCategory("");
      setEventDate("");
      setStartTime("");
      setLocation("");
      setDescription("");
      setRegistrationUrl("");
      setFeatured(false);

      setImageFile(null);
      setImagePreview(null);

      setMessage(
        "Event created successfully."
      );

      await fetchEvents();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create event."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // START EDITING
  // ==========================================
  const handleStartEdit = (
    event: Event
  ) => {
    const isDefaultCategory =
      EVENT_CATEGORIES
        .filter(
          (item) =>
            item !==
            "Others"
        )
        .includes(
          event.category
        );

    setEditingEvent(event);

    setEditTitle(
      event.title
    );

    setEditCategory(
      isDefaultCategory
        ? event.category
        : "Others"
    );

    setEditCustomCategory(
      isDefaultCategory
        ? ""
        : event.category
    );

    setEditEventDate(
      event.event_date
    );

    setEditStartTime(
      event.start_time
        ? event.start_time.slice(
            0,
            5
          )
        : ""
    );

    setEditLocation(
      event.location
    );

    setEditDescription(
      event.description ??
        ""
    );

    setEditRegistrationUrl(
      event.registration_url ??
        ""
    );

    setEditFeatured(
      event.featured
    );

    setEditImageFile(null);
    setEditImagePreview(null);

    setMessage("");
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancelEdit =
    () => {
      if (isEditing) return;

      setEditingEvent(null);

      setEditTitle("");
      setEditCategory("");
      setEditCustomCategory(
        ""
      );
      setEditEventDate("");
      setEditStartTime("");
      setEditLocation("");
      setEditDescription("");
      setEditRegistrationUrl(
        ""
      );
      setEditFeatured(false);

      setEditImageFile(null);
      setEditImagePreview(
        null
      );
    };

  // ==========================================
  // UPDATE EVENT
  // ==========================================
  const handleUpdateEvent =
    async (
      formEvent: FormEvent<HTMLFormElement>
    ) => {
      formEvent.preventDefault();

      if (!editingEvent) {
        return;
      }

      setMessage("");

      const finalCategory =
        editCategory ===
        "Others"
          ? editCustomCategory.trim()
          : editCategory;

      if (
        editCategory ===
          "Others" &&
        !editCustomCategory.trim()
      ) {
        setMessage(
          "Please enter the event category."
        );

        return;
      }

      setIsEditing(true);

      let newImagePath:
        | string
        | null = null;

      try {
        const timestamp =
          Date.now();

        const cleanTitle =
          createCleanTitle(
            editTitle
          );

        let imageUrl =
          editingEvent.image_url;

        let imagePath =
          editingEvent.image_path;

        // ====================================
        // REPLACE FLYER
        // ====================================
        if (editImageFile) {
          const extension =
            editImageFile.name
              .split(".")
              .pop()
              ?.toLowerCase();

          if (!extension) {
            throw new Error(
              "Unable to determine the flyer file type."
            );
          }

          newImagePath =
            `flyers/${timestamp}-${cleanTitle}.${extension}`;

          const {
            error:
              uploadError,
          } =
            await supabase.storage
              .from(
                "events"
              )
              .upload(
                newImagePath,
                editImageFile,
                {
                  cacheControl:
                    "3600",

                  upsert:
                    false,
                }
              );

          if (
            uploadError
          ) {
            throw uploadError;
          }

          const {
            data:
              publicUrlData,
          } =
            supabase.storage
              .from(
                "events"
              )
              .getPublicUrl(
                newImagePath
              );

          imageUrl =
            publicUrlData.publicUrl;

          imagePath =
            newImagePath;
        }

        // ====================================
        // FEATURED
        // ====================================
        if (
          editFeatured &&
          !editingEvent.featured
        ) {
          const {
            error:
              featuredError,
          } =
            await supabase
              .from(
                "events"
              )
              .update({
                featured:
                  false,
              })
              .eq(
                "featured",
                true
              )
              .neq(
                "id",
                editingEvent.id
              );

          if (
            featuredError
          ) {
            if (
              newImagePath
            ) {
              await supabase.storage
                .from(
                  "events"
                )
                .remove([
                  newImagePath,
                ]);
            }

            throw featuredError;
          }
        }

        // ====================================
        // UPDATE DATABASE
        // ====================================
        const {
          error:
            updateError,
        } =
          await supabase
            .from("events")
            .update({
              title:
                editTitle.trim(),

              category:
                finalCategory,

              event_date:
                editEventDate,

              start_time:
                editStartTime ||
                null,

              location:
                editLocation.trim(),

              description:
                editDescription.trim() ||
                null,

              image_url:
                imageUrl,

              image_path:
                imagePath,

              registration_url:
                editRegistrationUrl.trim() ||
                null,

              featured:
                editFeatured,
            })
            .eq(
              "id",
              editingEvent.id
            );

        if (
          updateError
        ) {
          if (
            newImagePath
          ) {
            await supabase.storage
              .from(
                "events"
              )
              .remove([
                newImagePath,
              ]);
          }

          throw updateError;
        }

        // ====================================
        // DELETE OLD FLYER
        // ====================================
        if (
          editImageFile &&
          editingEvent.image_path &&
          editingEvent.image_path !==
            newImagePath
        ) {
          const {
            error:
              cleanupError,
          } =
            await supabase.storage
              .from(
                "events"
              )
              .remove([
                editingEvent.image_path,
              ]);

          if (
            cleanupError
          ) {
            console.error(
              "Old flyer cleanup failed:",
              cleanupError
            );
          }
        }

        await fetchEvents();

        handleCancelEdit();

        setMessage(
          "Event updated successfully."
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to update event."
        );
      } finally {
        setIsEditing(false);
      }
    };

  // ==========================================
  // DELETE EVENT
  // ==========================================
  const handleDelete =
    async () => {
      if (!eventToDelete) {
        return;
      }

      setIsDeleting(true);
      setMessage("");

      try {
        // Delete flyer first.
        if (
          eventToDelete.image_path
        ) {
          const {
            error:
              storageError,
          } =
            await supabase.storage
              .from(
                "events"
              )
              .remove([
                eventToDelete.image_path,
              ]);

          if (
            storageError
          ) {
            throw storageError;
          }
        }

        const {
          error:
            deleteError,
        } =
          await supabase
            .from("events")
            .delete()
            .eq(
              "id",
              eventToDelete.id
            );

        if (
          deleteError
        ) {
          throw deleteError;
        }

        setEventToDelete(null);

        await fetchEvents();

        setMessage(
          "Event deleted successfully."
        );
      } catch (error) {
        console.error(error);

        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to delete event."
        );
      } finally {
        setIsDeleting(false);
      }
    };

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout =
    async () => {
      await supabase.auth.signOut();

      router.push(
        "/admin/login"
      );

      router.refresh();
    };

  // ==========================================
  // AUTH LOADING
  // ==========================================
  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F3]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/40">
          Loading Events
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F3] text-black">



      <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* ====================================
            INTRO
        ==================================== */}
        <div className="grid gap-8 border-b border-black/10 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-green-700">
              Admin
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Keep the family
              <span className="block text-green-700">
                in the loop.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-black/45 lg:justify-self-end">
            Create and manage
            upcoming TACSFON events.
            Events will automatically
            appear on the public
            website.
          </p>

        </div>


        {/* ====================================
            MESSAGE
        ==================================== */}
        {message && (
          <div className="mt-8 border border-black/10 bg-white px-5 py-4">
            <p className="text-sm text-black/60">
              {message}
            </p>
          </div>
        )}


        {/* ====================================
            CREATE FORM
        ==================================== */}
        <section className="mt-10 bg-white p-6 sm:p-8 lg:p-10">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
              <FiPlus />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-green-700">
                New Event
              </p>

              <h3 className="mt-1 text-2xl font-medium tracking-[-0.035em]">
                Create an event
              </h3>
            </div>
          </div>


          <form
            onSubmit={
              handleSubmit
            }
            className="mt-10"
          >
            <div className="grid gap-6 lg:grid-cols-2">

              {/* TITLE */}
              <label className="block lg:col-span-2">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Event Title
                </span>

                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Freshers Welcome Service"
                  className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none transition-colors focus:border-green-700"
                />
              </label>


              {/* CATEGORY */}
              <label className="block">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Category
                </span>

                <select
                  value={
                    category
                  }
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none focus:border-green-700"
                >
                  {EVENT_CATEGORIES.map(
                    (item) => (
                      <option
                        key={
                          item
                        }
                        value={
                          item
                        }
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </label>


              {/* CUSTOM CATEGORY */}
              <AnimatePresence>
                {category ===
                  "Others" && (
                  <motion.label
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    className="block"
                  >
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Programme
                      Name
                    </span>

                    <input
                      type="text"
                      value={
                        customCategory
                      }
                      onChange={(
                        e
                      ) =>
                        setCustomCategory(
                          e
                            .target
                            .value
                        )
                      }
                      placeholder="Enter category"
                      className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none focus:border-green-700"
                    />
                  </motion.label>
                )}
              </AnimatePresence>


              {/* DATE */}
              <label className="block">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Event Date
                </span>

                <input
                  type="date"
                  required
                  value={
                    eventDate
                  }
                  onChange={(e) =>
                    setEventDate(
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </label>


              {/* TIME */}
              <label className="block">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Start Time
                </span>

                <input
                  type="time"
                  value={
                    startTime
                  }
                  onChange={(e) =>
                    setStartTime(
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </label>


              {/* LOCATION */}
              <label className="block lg:col-span-2">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Location
                </span>

                <input
                  type="text"
                  required
                  value={
                    location
                  }
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  placeholder="e.g. TACSFON Family House, New Gen. Area"
                  className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </label>


              {/* DESCRIPTION */}
              <label className="block lg:col-span-2">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Short
                  Description
                </span>

                <textarea
                  rows={5}
                  value={
                    description
                  }
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Tell people what this event is about..."
                  className="w-full resize-none border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm leading-6 outline-none focus:border-green-700"
                />
              </label>


              {/* REGISTRATION */}
              <label className="block lg:col-span-2">
                <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Registration
                  Link — Optional
                </span>

                <input
                  type="url"
                  value={
                    registrationUrl
                  }
                  onChange={(e) =>
                    setRegistrationUrl(
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                  className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </label>


              {/* FLYER */}
              <div className="lg:col-span-2">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Event Flyer
                </p>

                <label className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-black/20 bg-[#F7F7F3] px-6 py-10 text-center transition-colors hover:border-green-700">

                  <FiImage className="text-2xl text-green-700" />

                  <p className="mt-4 text-sm font-medium">
                    Choose event
                    flyer
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    JPG, PNG or
                    WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                  />
                </label>


                {imagePreview && (
                  <div className="mt-5 max-w-[260px] overflow-hidden bg-black">
                    <img
                      src={
                        imagePreview
                      }
                      alt="Event flyer preview"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                )}

              </div>


              {/* FEATURED */}
              <label className="flex cursor-pointer items-center gap-3 lg:col-span-2">

                <input
                  type="checkbox"
                  checked={
                    featured
                  }
                  onChange={(e) =>
                    setFeatured(
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-green-700"
                />

                <span className="text-sm text-black/60">
                  Feature this
                  event
                </span>

              </label>

            </div>


            <button
              type="submit"
              disabled={
                isLoading
              }
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-green-700 px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? "Creating..."
                : "Create Event"}
            </button>

          </form>

        </section>


        {/* ====================================
            EXISTING EVENTS
        ==================================== */}
        <section className="mt-12">

          <div className="flex items-end justify-between gap-5">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                Events
              </p>

              <h3 className="mt-2 text-3xl font-medium tracking-[-0.04em]">
                Existing events
              </h3>
            </div>

            <p className="text-xs text-black/40">
              {events.length}{" "}
              {events.length === 1
                ? "event"
                : "events"}
            </p>

          </div>


          <div className="mt-7 space-y-3">

            {events.length ===
            0 ? (
              <div className="bg-white px-6 py-16 text-center">
                <FiCalendar className="mx-auto text-2xl text-black/25" />

                <p className="mt-4 text-sm text-black/45">
                  No events have
                  been created yet.
                </p>
              </div>
            ) : (
              events.map(
                (event) => (
                  <article
                    key={
                      event.id
                    }
                    className="grid gap-5 bg-white p-4 sm:p-5 md:grid-cols-[90px_1fr_auto] md:items-center"
                  >

                    {/* IMAGE */}
                    <div className="h-[120px] overflow-hidden bg-black md:h-[105px]">

                      {event.image_url ? (
                        <img
                          src={
                            event.image_url
                          }
                          alt={
                            event.title
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FiImage className="text-white/30" />
                        </div>
                      )}

                    </div>


                    {/* DETAILS */}
                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-green-700">
                          {
                            event.category
                          }
                        </p>

                        {event.featured && (
                          <span className="bg-green-50 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-green-700">
                            Featured
                          </span>
                        )}

                      </div>

                      <h4 className="mt-2 text-lg font-medium tracking-[-0.025em]">
                        {
                          event.title
                        }
                      </h4>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-black/45">

                        <span className="flex items-center gap-1.5">
                          <FiCalendar />

                          {formatDate(
                            event.event_date
                          )}

                          {event.start_time &&
                            ` · ${formatTime(
                              event.start_time
                            )}`}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <FiMapPin />

                          {
                            event.location
                          }
                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}
                    <div className="flex flex-wrap items-center gap-2 md:justify-end">

                      {event.registration_url && (
                        <a
                          href={
                            event.registration_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open registration link"
                          className="flex h-10 w-10 items-center justify-center border border-black/10 transition-colors hover:bg-black hover:text-white"
                        >
                          <FiExternalLink />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleStartEdit(
                            event
                          )
                        }
                        className="flex items-center gap-2 border border-black/10 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-black hover:text-white"
                      >
                        <FiEdit2 />

                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEventToDelete(
                            event
                          )
                        }
                        className="flex items-center gap-2 border border-red-200 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                      >
                        <FiTrash2 />

                        Delete
                      </button>

                    </div>

                  </article>
                )
              )
            )}

          </div>

        </section>

      </div>


      {/* ======================================
          EDIT SLIDE-OVER
      ====================================== */}
      <AnimatePresence>
        {editingEvent && (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >

            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Close editor"
              onClick={
                handleCancelEdit
              }
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                },
              }}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />


            {/* PANEL */}
            <motion.div
              variants={{
                hidden: {
                  x: "100%",
                },
                visible: {
                  x: 0,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="absolute right-0 top-0 z-10 h-full w-full overflow-y-auto bg-[#F7F7F3] shadow-2xl sm:max-w-[620px]"
            >

              {/* HEADER */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/10 bg-[#F7F7F3]/95 px-6 py-5 backdrop-blur-md sm:px-8">

                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-700">
                    Event Editor
                  </p>

                  <h3 className="mt-1 text-xl font-medium tracking-[-0.03em]">
                    Edit event
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={
                    handleCancelEdit
                  }
                  disabled={
                    isEditing
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white disabled:opacity-40"
                >
                  <FiX />
                </button>

              </div>


              <form
                onSubmit={
                  handleUpdateEvent
                }
                className="px-6 pb-32 pt-8 sm:px-8"
              >
                <div className="space-y-6">

                  {/* TITLE */}
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Event Title
                    </span>

                    <input
                      type="text"
                      required
                      value={
                        editTitle
                      }
                      onChange={(e) =>
                        setEditTitle(
                          e.target.value
                        )
                      }
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                    />
                  </label>


                  {/* CATEGORY */}
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Category
                    </span>

                    <select
                      value={
                        editCategory
                      }
                      onChange={(e) =>
                        setEditCategory(
                          e.target.value
                        )
                      }
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                    >
                      {EVENT_CATEGORIES.map(
                        (item) => (
                          <option
                            key={
                              item
                            }
                            value={
                              item
                            }
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </label>


                  <AnimatePresence>
                    {editCategory ===
                      "Others" && (
                      <motion.label
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="block overflow-hidden"
                      >
                        <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                          Programme
                          Name
                        </span>

                        <input
                          type="text"
                          value={
                            editCustomCategory
                          }
                          onChange={(e) =>
                            setEditCustomCategory(
                              e
                                .target
                                .value
                            )
                          }
                          className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                        />
                      </motion.label>
                    )}
                  </AnimatePresence>


                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* DATE */}
                    <label>
                      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                        Date
                      </span>

                      <input
                        type="date"
                        required
                        value={
                          editEventDate
                        }
                        onChange={(e) =>
                          setEditEventDate(
                            e
                              .target
                              .value
                          )
                        }
                        className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                      />
                    </label>


                    {/* TIME */}
                    <label>
                      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                        Time
                      </span>

                      <input
                        type="time"
                        value={
                          editStartTime
                        }
                        onChange={(e) =>
                          setEditStartTime(
                            e
                              .target
                              .value
                          )
                        }
                        className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                      />
                    </label>

                  </div>


                  {/* LOCATION */}
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Location
                    </span>

                    <input
                      type="text"
                      required
                      value={
                        editLocation
                      }
                      onChange={(e) =>
                        setEditLocation(
                          e.target.value
                        )
                      }
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                    />
                  </label>


                  {/* DESCRIPTION */}
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Description
                    </span>

                    <textarea
                      rows={5}
                      value={
                        editDescription
                      }
                      onChange={(e) =>
                        setEditDescription(
                          e.target.value
                        )
                      }
                      className="w-full resize-none border border-black/10 bg-white px-4 py-4 text-sm leading-6 outline-none focus:border-green-700"
                    />
                  </label>


                  {/* REGISTRATION */}
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Registration
                      Link
                    </span>

                    <input
                      type="url"
                      value={
                        editRegistrationUrl
                      }
                      onChange={(e) =>
                        setEditRegistrationUrl(
                          e.target.value
                        )
                      }
                      placeholder="https://..."
                      className="w-full border border-black/10 bg-white px-4 py-4 text-sm outline-none focus:border-green-700"
                    />
                  </label>


                  {/* CURRENT / NEW FLYER */}
                  <div>
                    <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      Event Flyer
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">

                      {editingEvent.image_url && (
                        <div>
                          <p className="mb-2 text-[9px] uppercase tracking-[0.15em] text-black/35">
                            Current
                          </p>

                          <img
                            src={
                              editingEvent.image_url
                            }
                            alt={
                              editingEvent.title
                            }
                            className="aspect-[4/5] w-full object-cover"
                          />
                        </div>
                      )}

                      {editImagePreview && (
                        <div>
                          <p className="mb-2 text-[9px] uppercase tracking-[0.15em] text-green-700">
                            Replacement
                          </p>

                          <img
                            src={
                              editImagePreview
                            }
                            alt="Replacement flyer preview"
                            className="aspect-[4/5] w-full object-cover"
                          />
                        </div>
                      )}

                    </div>


                    <label className="mt-4 flex cursor-pointer items-center justify-center border border-dashed border-black/20 bg-white px-5 py-6 text-center transition-colors hover:border-green-700">

                      <span className="text-xs font-medium">
                        {editImageFile
                          ? editImageFile.name
                          : "Choose replacement flyer"}
                      </span>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={
                          handleEditImageChange
                        }
                        className="hidden"
                      />

                    </label>

                  </div>


                  {/* FEATURED */}
                  <label className="flex cursor-pointer items-center gap-3">

                    <input
                      type="checkbox"
                      checked={
                        editFeatured
                      }
                      onChange={(e) =>
                        setEditFeatured(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 accent-green-700"
                    />

                    <span className="text-sm text-black/60">
                      Feature this
                      event
                    </span>

                  </label>

                </div>


                {/* FIXED ACTIONS */}
                <div className="fixed bottom-0 right-0 z-30 flex w-full gap-3 border-t border-black/10 bg-white/95 px-6 py-5 backdrop-blur-md sm:max-w-[620px] sm:px-8">

                  <button
                    type="button"
                    onClick={
                      handleCancelEdit
                    }
                    disabled={
                      isEditing
                    }
                    className="flex-1 border border-black/10 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white disabled:opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      isEditing
                    }
                    className="flex-1 bg-green-700 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black disabled:opacity-40"
                  >
                    {isEditing
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>


      {/* ======================================
          DELETE CONFIRMATION
      ====================================== */}
      <AnimatePresence>
        {eventToDelete && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center px-5"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >

            <button
              type="button"
              aria-label="Close delete confirmation"
              onClick={() => {
                if (
                  !isDeleting
                ) {
                  setEventToDelete(
                    null
                  );
                }
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="relative z-10 w-full max-w-md bg-white p-7 sm:p-8"
            >

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-red-600">
                Delete Event
              </p>

              <h3 className="mt-4 text-2xl font-medium tracking-[-0.035em]">
                Are you sure?
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/50">
                &ldquo;
                {
                  eventToDelete.title
                }
                &rdquo; and its
                uploaded flyer will
                be permanently
                deleted.
              </p>

              <div className="mt-8 flex gap-3">

                <button
                  type="button"
                  disabled={
                    isDeleting
                  }
                  onClick={() =>
                    setEventToDelete(
                      null
                    )
                  }
                  className="flex-1 border border-black/10 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-black hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleDelete
                  }
                  disabled={
                    isDeleting
                  }
                  className="flex-1 bg-red-600 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-85 disabled:opacity-40"
                >
                  {isDeleting
                    ? "Deleting..."
                    : "Delete Event"}
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default AdminEventsPage;