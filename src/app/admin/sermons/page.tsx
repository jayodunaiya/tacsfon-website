"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import { Sermon } from "@/types/sermon.types";

const AdminSermonsPage = () => {
  const router = useRouter();

  const [sermons, setSermons] = useState<Sermon[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Sunday Service");
  const [customCategory, setCustomCategory] = useState("");
  const [sermonDate, setSermonDate] = useState("");
  const [featured, setFeatured] = useState(false);

  const [audioFile, setAudioFile] =
    useState<File | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const fetchSermons = async () => {
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("sermon_date", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setSermons(data ?? []);
  };

  useEffect(() => {
    const checkUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    router.push("/admin/login");
    return;
  }

  const {
    data: isAdmin,
    error,
  } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    await supabase.auth.signOut();

    router.push("/admin/login");
    return;
  }

  await fetchSermons();
};

    checkUser();
  }, [router]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const finalCategory =
  category === "Others"
    ? customCategory.trim()
    : category;

    setMessage("");

    if (!audioFile) {
      setMessage("Please select an audio file.");
      return;
    }

    setIsLoading(true);

    try {
      // ==========================================
      // 1. BUILD SAFE FILE NAME
      // ==========================================
      const fileExtension =
        audioFile.name.split(".").pop();

      const cleanTitle = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const fileName = `${Date.now()}-${cleanTitle}.${fileExtension}`;

      // ==========================================
      // 2. UPLOAD AUDIO
      // ==========================================
      const {
        error: uploadError,
      } = await supabase.storage
        .from("sermons")
        .upload(fileName, audioFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // ==========================================
      // 3. GET PUBLIC URL
      // ==========================================
      const {
        data: publicUrlData,
      } = supabase.storage
        .from("sermons")
        .getPublicUrl(fileName);

      const audioUrl =
        publicUrlData.publicUrl;

      // ==========================================
      // 4. IF FEATURED, REMOVE OLD FEATURED
      // ==========================================
      if (featured) {
        const {
          error: featuredError,
        } = await supabase
          .from("sermons")
          .update({
            featured: false,
          })
          .eq("featured", true);

        if (featuredError) {
          throw featuredError;
        }
      }

      // ==========================================
      // 5. INSERT DATABASE RECORD
      // ==========================================
      const {
  error: insertError,
} = await supabase
  .from("sermons")
  .insert({
    title,
    category: finalCategory,
    sermon_date: sermonDate,

    audio_url: audioUrl,
    audio_path: fileName,

    image_url: null,
    featured,
  });

      if (insertError) {
        /*
          If DB insertion fails after upload,
          remove the uploaded file to avoid
          leaving unused files in storage.
        */
        await supabase.storage
          .from("sermons")
          .remove([fileName]);

        throw insertError;
      }

      // ==========================================
      // 6. RESET FORM
      // ==========================================
      setTitle("");
    setCategory("Sunday Service");
    setCustomCategory("");
    setSermonDate("");
    setFeatured(false);
    setAudioFile(null);

      setMessage(
        "Sermon uploaded successfully."
      );

      await fetchSermons();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload sermon."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  };

  const handleDelete = async (sermon: Sermon) => {
  const confirmed = window.confirm(
    `Delete "${sermon.title}"? This action cannot be undone.`
  );

  if (!confirmed) return;

  try {
    // 1. Delete audio file from storage
    if (sermon.audio_path) {
      const { error: storageError } =
        await supabase.storage
          .from("sermons")
          .remove([sermon.audio_path]);

      if (storageError) {
        throw storageError;
      }
    }

    // 2. Delete database record
    const { error: deleteError } =
      await supabase
        .from("sermons")
        .delete()
        .eq("id", sermon.id);

    if (deleteError) {
      throw deleteError;
    }

    // 3. Refresh list
    await fetchSermons();

    setMessage("Sermon deleted successfully.");
  } catch (error) {
    console.error(error);

    setMessage(
      error instanceof Error
        ? error.message
        : "Unable to delete sermon."
    );
  }
};

  return (
    <main className="min-h-screen bg-[#F7F7F3] px-6 py-24 text-black lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="flex flex-col gap-6 border-b border-black/10 pb-10 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
              TACSFON Admin
            </p>

            <h1 className="mt-4 text-5xl font-medium tracking-[-0.05em] md:text-6xl">
              Sermons.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
              Upload and manage sermons published on
              the TACSFON website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-fit border border-black/10 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            Sign Out
          </button>

        </div>


        {/* ========================================
            UPLOAD FORM
        ======================================== */}
        <section className="mt-14">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-green-700">
                New Sermon
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
                Add a message.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-black/50">
                Upload the sermon audio and its
                information. It will automatically
                appear on the public Sermons page.
              </p>
            </div>


            <form
              onSubmit={handleSubmit}
              className="border border-black/10 bg-white p-6 md:p-8"
            >

              <div className="grid gap-6 md:grid-cols-2">

                {/* TITLE */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    Sermon Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    required
                    placeholder="The Nature of Jesus"
                    className="w-full border border-black/10 px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-green-700"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    Category
                </label>

                <select
                    value={category}
                    onChange={(event) => {
                    setCategory(event.target.value);

                    if (event.target.value !== "Others") {
                        setCustomCategory("");
                    }
                    }}
                    className="w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-green-700"
                >
                    <option value="Sunday Service">
                    Sunday Service
                    </option>

                    <option value="Bible Study">
                    Bible Study
                    </option>

                    <option value="Others">
                    Others
                    </option>
                </select>

                {category === "Others" && (
                    <div className="mt-4">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                        Programme Name
                    </label>

                    <input
                        type="text"
                        value={customCategory}
                        onChange={(event) =>
                        setCustomCategory(event.target.value)
                        }
                        placeholder="e.g. Freshers' Welcome Service"
                        required
                        className="w-full border border-black/10 px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-green-700"
                    />
                    </div>
                )}
                </div>


                {/* DATE */}
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    Sermon Date
                  </label>

                  <input
                    type="date"
                    value={sermonDate}
                    onChange={(event) =>
                      setSermonDate(event.target.value)
                    }
                    required
                    className="w-full border border-black/10 px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-green-700"
                  />
                </div>



                {/* AUDIO */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    Sermon Audio
                  </label>

                  <input
                    type="file"
                    accept="audio/*,.mp3,.m4a"
                    onChange={(event) =>
                      setAudioFile(
                        event.target.files?.[0] ??
                          null
                      )
                    }
                    required
                    className="w-full border border-dashed border-black/15 p-5 text-sm text-black/50"
                  />

                  {audioFile && (
                    <p className="mt-3 text-xs text-black/45">
                      Selected: {audioFile.name}
                    </p>
                  )}
                </div>


                {/* FEATURED */}
                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(event) =>
                        setFeatured(
                          event.target.checked
                        )
                      }
                      className="h-4 w-4 accent-green-700"
                    />

                    <span className="text-sm text-black/60">
                      Make this the featured sermon
                    </span>
                  </label>
                </div>

              </div>


              {message && (
                <p className="mt-6 text-sm text-black/60">
                  {message}
                </p>
              )}


              <button
                type="submit"
                disabled={isLoading}
                className="mt-8 w-full bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? "Uploading..."
                  : "Upload Sermon"}
              </button>

            </form>

          </div>
        </section>


        {/* ========================================
            EXISTING SERMONS
        ======================================== */}
        <section className="mt-24">

          <div className="flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-green-700">
                Published
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                Existing sermons
              </h2>
            </div>

            <p className="text-sm text-black/40">
              {sermons.length}{" "}
              {sermons.length === 1
                ? "sermon"
                : "sermons"}
            </p>
          </div>


          {sermons.map((sermon, index) => (
            <div
              key={sermon.id}
              className="grid gap-4 border-b border-black/10 py-7 md:grid-cols-[60px_1fr_170px_130px_100px] md:items-center"
            >

              <p className="text-[10px] font-semibold tracking-[0.2em] text-green-700">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </p>

              <div>
                <h3 className="text-xl font-medium tracking-[-0.025em]">
                  {sermon.title}
                </h3>

                {sermon.featured && (
                  <span className="mt-2 inline-block bg-green-700 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs uppercase tracking-[0.14em] text-black/40">
                {sermon.category}
              </p>

              <p className="text-sm text-black/45">
                {new Date(
                  `${sermon.sermon_date}T00:00:00`
                ).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>

            </div>
            
          ))}
          

        </section>

      </div>
    </main>
  );
};

export default AdminSermonsPage;