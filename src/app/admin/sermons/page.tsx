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

import { supabase } from "@/lib/supabase/client";
import { Sermon } from "@/types/sermon.types";

const AdminSermonsPage = () => {
  const router = useRouter();

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [editingSermon, setEditingSermon] =
  useState<Sermon | null>(null);

const [editTitle, setEditTitle] =
  useState("");

const [editCategory, setEditCategory] =
  useState("");

const [editCustomCategory, setEditCustomCategory] =
  useState("");

const [editSermonDate, setEditSermonDate] =
  useState("");

const [editFeatured, setEditFeatured] =
  useState(false);

const [editAudioFile, setEditAudioFile] =
  useState<File | null>(null);

const [editImageFile, setEditImageFile] =
  useState<File | null>(null);

const [isEditing, setIsEditing] =
  useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("Sunday Service");

  const [customCategory, setCustomCategory] =
    useState("");

  const [sermonDate, setSermonDate] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [audioFile, setAudioFile] =
    useState<File | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

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

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0] ?? null;

    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    setImageFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  useEffect(() => {
  if (!editingSermon) return;

  const previousOverflow =
    document.body.style.overflow;

  document.body.style.overflow =
    "hidden";

  return () => {
    document.body.style.overflow =
      previousOverflow;
  };
}, [editingSermon]);

useEffect(() => {
  if (!editingSermon) return;

  const previousOverflow =
    document.body.style.overflow;

  document.body.style.overflow = "hidden";

  const handleKeyDown = (
    event: KeyboardEvent
  ) => {
    if (event.key === "Escape") {
      handleCancelEdit();
    }
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
}, [editingSermon]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      setMessage(
        "Please select a sermon audio file."
      );
      return;
    }

    if (!imageFile) {
      setMessage(
        "Please select the sermon flyer."
      );
      return;
    }

    if (
      category === "Others" &&
      !customCategory.trim()
    ) {
      setMessage(
        "Please enter the programme name."
      );
      return;
    }

    setIsLoading(true);

    let audioPath = "";
    let imagePath = "";

    try {
      const timestamp = Date.now();

      const cleanTitle = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const audioExtension =
        audioFile.name
          .split(".")
          .pop()
          ?.toLowerCase();

      const imageExtension =
        imageFile.name
          .split(".")
          .pop()
          ?.toLowerCase();

      audioPath =
        `audio/${timestamp}-${cleanTitle}.${audioExtension}`;

      imagePath =
        `flyers/${timestamp}-${cleanTitle}.${imageExtension}`;

      // ==========================================
// UPLOAD SERMON AUDIO
// ==========================================

const audioContentType =
  audioExtension === "m4a"
    ? "audio/mp4"
    : audioExtension === "mp3"
      ? "audio/mpeg"
      : audioFile.type ||
        "application/octet-stream";

const { error: audioUploadError } =
  await supabase.storage
    .from("sermons")
    .upload(
      audioPath,
      audioFile,
      {
        contentType:
          audioContentType,
        cacheControl: "3600",
        upsert: false,
      }
    );

if (audioUploadError) {
  throw audioUploadError;
}

      // Upload sermon flyer
      const {
        error: imageUploadError,
      } = await supabase.storage
        .from("sermons")
        .upload(
          imagePath,
          imageFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (imageUploadError) {
        await supabase.storage
          .from("sermons")
          .remove([audioPath]);

        throw imageUploadError;
      }

      // Get audio public URL
      const {
        data: audioPublicUrlData,
      } = supabase.storage
        .from("sermons")
        .getPublicUrl(audioPath);

      const audioUrl =
        audioPublicUrlData.publicUrl;

      // Get flyer public URL
      const {
        data: imagePublicUrlData,
      } = supabase.storage
        .from("sermons")
        .getPublicUrl(imagePath);

      const imageUrl =
        imagePublicUrlData.publicUrl;

      // Remove previous featured sermon
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

      // Save sermon
      const {
        error: insertError,
      } = await supabase
        .from("sermons")
        .insert({
          title,
          category: finalCategory,
          sermon_date: sermonDate,

          audio_url: audioUrl,
          audio_path: audioPath,

          image_url: imageUrl,
          image_path: imagePath,

          featured,
        });

      if (insertError) {
        await supabase.storage
          .from("sermons")
          .remove([
            audioPath,
            imagePath,
          ]);

        throw insertError;
      }

      // Reset form
      setTitle("");
      setCategory("Sunday Service");
      setCustomCategory("");
      setSermonDate("");
      setFeatured(false);

      setAudioFile(null);
      setImageFile(null);
      setImagePreview(null);

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

  const handleStartEdit = (
  sermon: Sermon
) => {
  const defaultCategories = [
    "Sunday Service",
    "Bible Study",
  ];

  const isDefaultCategory =
    defaultCategories.includes(
      sermon.category
    );

  setEditingSermon(sermon);

  setEditTitle(sermon.title);

  setEditCategory(
    isDefaultCategory
      ? sermon.category
      : "Others"
  );

  setEditCustomCategory(
    isDefaultCategory
      ? ""
      : sermon.category
  );

  setEditSermonDate(
    sermon.sermon_date
  );

  setEditFeatured(
    sermon.featured
  );

  setEditAudioFile(null);
  setEditImageFile(null);

  setMessage("");
};

const handleCancelEdit = () => {
  setEditingSermon(null);

  setEditTitle("");
  setEditCategory("");
  setEditCustomCategory("");
  setEditSermonDate("");
  setEditFeatured(false);

  setEditAudioFile(null);
  setEditImageFile(null);

  setMessage("");
};

  const handleUpdateSermon = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!editingSermon) return;

  const finalCategory =
    editCategory === "Others"
      ? editCustomCategory.trim()
      : editCategory;

  if (
    editCategory === "Others" &&
    !editCustomCategory.trim()
  ) {
    setMessage(
      "Please enter the programme name."
    );
    return;
  }

  setIsEditing(true);
  setMessage("");

  let newAudioPath: string | null = null;
  let newImagePath: string | null = null;

  try {
    const timestamp = Date.now();

    const cleanTitle = editTitle
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let audioUrl =
      editingSermon.audio_url;

    let audioPath =
      editingSermon.audio_path;

    let imageUrl =
      editingSermon.image_url;

    let imagePath =
      editingSermon.image_path;

    // ==========================================
// REPLACE AUDIO IF NEW AUDIO WAS SELECTED
// ==========================================

if (editAudioFile) {
  const extension =
    editAudioFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

  if (!extension) {
    throw new Error(
      "Unable to determine the audio file type."
    );
  }

  // Create a new Storage path.
  // We deliberately upload a NEW object first
  // instead of overwriting the existing file.
  newAudioPath =
    `audio/${timestamp}-${cleanTitle}.${extension}`;

  // ========================================
  // NORMALIZE AUDIO CONTENT TYPE
  // ========================================
  //
  // Browsers/Supabase may identify .m4a as
  // audio/x-m4a.
  //
  // We explicitly store M4A as audio/mp4 so
  // the browser receives the standard MIME
  // type when using the HTML <audio> element.
  //
  const audioContentType =
    extension === "m4a"
      ? "audio/mp4"
      : extension === "mp3"
        ? "audio/mpeg"
        : editAudioFile.type ||
          "application/octet-stream";

  // ========================================
  // UPLOAD REPLACEMENT AUDIO
  // ========================================

  const {
    error: audioUploadError,
  } = await supabase.storage
    .from("sermons")
    .upload(
      newAudioPath,
      editAudioFile,
      {
        contentType:
          audioContentType,

        cacheControl: "3600",

        upsert: false,
      }
    );

  if (audioUploadError) {
    throw audioUploadError;
  }

  // ========================================
  // GET NEW PUBLIC URL
  // ========================================

  const {
    data: publicUrlData,
  } = supabase.storage
    .from("sermons")
    .getPublicUrl(
      newAudioPath
    );

  if (!publicUrlData.publicUrl) {
    // Clean up the new file if for some
    // reason its public URL cannot be created.
    await supabase.storage
      .from("sermons")
      .remove([
        newAudioPath,
      ]);

    throw new Error(
      "Unable to create the public URL for the new sermon audio."
    );
  }

  // These variables are later written
  // into the sermons database row.
  audioUrl =
    publicUrlData.publicUrl;

  audioPath =
    newAudioPath;
}

    // ==========================================
    // REPLACE FLYER IF NEW IMAGE WAS SELECTED
    // ==========================================
    if (editImageFile) {
      const extension =
        editImageFile.name
          .split(".")
          .pop()
          ?.toLowerCase();

      newImagePath =
        `flyers/${timestamp}-${cleanTitle}.${extension}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("sermons")
        .upload(
          newImagePath,
          editImageFile,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (uploadError) {
        // Remove newly uploaded audio if this
        // update fails before the DB is changed.
        if (newAudioPath) {
          await supabase.storage
            .from("sermons")
            .remove([newAudioPath]);
        }

        throw uploadError;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("sermons")
        .getPublicUrl(newImagePath);

      imageUrl =
        publicUrlData.publicUrl;

      imagePath =
        newImagePath;
    }

    // ==========================================
    // REMOVE PREVIOUS FEATURED STATUS
    // ==========================================
    if (
      editFeatured &&
      !editingSermon.featured
    ) {
      const {
        error: featuredError,
      } = await supabase
        .from("sermons")
        .update({
          featured: false,
        })
        .eq("featured", true)
        .neq("id", editingSermon.id);

      if (featuredError) {
        throw featuredError;
      }
    }

    // ==========================================
    // UPDATE SERMON
    // ==========================================
    const {
      error: updateError,
    } = await supabase
      .from("sermons")
      .update({
        title: editTitle.trim(),
        category: finalCategory,
        sermon_date: editSermonDate,

        audio_url: audioUrl,
        audio_path: audioPath,

        image_url: imageUrl,
        image_path: imagePath,

        featured: editFeatured,
      })
      .eq("id", editingSermon.id);

    if (updateError) {
      // Remove newly uploaded files because
      // the database update failed.
      const cleanup: string[] = [];

      if (newAudioPath) {
        cleanup.push(newAudioPath);
      }

      if (newImagePath) {
        cleanup.push(newImagePath);
      }

      if (cleanup.length > 0) {
        await supabase.storage
          .from("sermons")
          .remove(cleanup);
      }

      throw updateError;
    }

    // ==========================================
    // DELETE OLD AUDIO AFTER SUCCESSFUL UPDATE
    // ==========================================
    if (
      editAudioFile &&
      editingSermon.audio_path &&
      editingSermon.audio_path !==
        newAudioPath
    ) {
      await supabase.storage
        .from("sermons")
        .remove([
          editingSermon.audio_path,
        ]);
    }

    // ==========================================
    // DELETE OLD FLYER AFTER SUCCESSFUL UPDATE
    // ==========================================
    if (
      editImageFile &&
      editingSermon.image_path &&
      editingSermon.image_path !==
        newImagePath
    ) {
      await supabase.storage
        .from("sermons")
        .remove([
          editingSermon.image_path,
        ]);
    }

    await fetchSermons();

    handleCancelEdit();

    setMessage(
      "Sermon updated successfully."
    );
  } catch (error) {
    console.error(error);

    setMessage(
      error instanceof Error
        ? error.message
        : "Unable to update sermon."
    );
  } finally {
    setIsEditing(false);
  }
};

  const handleDelete = async (
    sermon: Sermon
  ) => {
    const confirmed = window.confirm(
      `Delete "${sermon.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setMessage("");

      const filesToDelete: string[] = [];

      if (sermon.audio_path) {
        filesToDelete.push(
          sermon.audio_path
        );
      }

      if (sermon.image_path) {
        filesToDelete.push(
          sermon.image_path
        );
      }

      // Delete audio + flyer
      if (filesToDelete.length > 0) {
        const {
          error: storageError,
        } = await supabase.storage
          .from("sermons")
          .remove(filesToDelete);

        if (storageError) {
          throw storageError;
        }
      }

      // Delete sermon row
      const {
        error: deleteError,
      } = await supabase
        .from("sermons")
        .delete()
        .eq("id", sermon.id);

      if (deleteError) {
        throw deleteError;
      }

      await fetchSermons();

      setMessage(
        "Sermon deleted successfully."
      );
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


        {/* UPLOAD FORM */}
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
                Upload the sermon audio, flyer and
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
                      setTitle(
                        event.target.value
                      )
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
                      setCategory(
                        event.target.value
                      );

                      if (
                        event.target.value !==
                        "Others"
                      ) {
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
                          setCustomCategory(
                            event.target.value
                          )
                        }
                        required
                        placeholder="e.g. Freshers' Welcome Service"
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
                      setSermonDate(
                        event.target.value
                      )
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


                {/* SERMON FLYER */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    Sermon Flyer
                  </label>

                  <div className="grid gap-5 md:grid-cols-[1fr_180px]">

                    <div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={
                          handleImageChange
                        }
                        required
                        className="w-full border border-dashed border-black/15 p-5 text-sm text-black/50"
                      />

                      <p className="mt-3 text-xs leading-5 text-black/40">
                        JPG, PNG or WEBP.
                      </p>

                      {imageFile && (
                        <p className="mt-2 text-xs text-black/50">
                          Selected:{" "}
                          {imageFile.name}
                        </p>
                      )}
                    </div>


                    {imagePreview ? (
                      <div className="overflow-hidden border border-black/10 bg-[#F7F7F3]">
                        <img
                          src={imagePreview}
                          alt="Sermon flyer preview"
                          className="aspect-[4/5] h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-black/15 bg-[#F7F7F3] px-4 text-center">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/30">
                          Flyer Preview
                        </p>
                      </div>
                    )}

                  </div>
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


        {/* EXISTING SERMONS */}
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

          {sermons.length === 0 ? (
            <div className="py-14">
              <p className="text-sm text-black/40">
                No sermons have been uploaded yet.
              </p>
            </div>
          ) : (
            sermons.map(
              (sermon, index) => (
                <div
                  key={sermon.id}
                  className="grid gap-4 border-b border-black/10 py-7 md:grid-cols-[50px_70px_1fr_150px_130px_150px] md:items-center"
                >

                  {/* NUMBER */}
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-green-700">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </p>


                  {/* FLYER */}
                  <div className="h-16 w-14 overflow-hidden bg-black/5">
                    {sermon.image_url ? (
                      <img
                        src={sermon.image_url}
                        alt={sermon.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-black text-[7px] font-semibold uppercase tracking-wider text-white">
                        TACSFON
                      </div>
                    )}
                  </div>


                  {/* TITLE */}
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


                  {/* CATEGORY */}
                  <p className="text-xs uppercase tracking-[0.14em] text-black/40">
                    {sermon.category}
                  </p>


                  {/* DATE */}
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


                  {/* ACTIONS */}
                <div className="flex items-center justify-start gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      handleStartEdit(sermon)
                    }
                    className="border border-black/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-black hover:text-white"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(sermon)
                    }
                    className="border border-red-200 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-red-600 transition-colors duration-300 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>

                </div>
              )
            )
          )}

        </section>

      </div>
      {/* ========================================
    EDIT SERMON SLIDE-OVER
======================================== */}
<AnimatePresence>
  {editingSermon && (
    <motion.div
      key="sermon-editor"
      className="fixed inset-0 z-[100]"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* BACKDROP */}
      <motion.button
        type="button"
        aria-label="Close edit sermon"
        onClick={handleCancelEdit}
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.3,
        }}
        className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-[2px]"
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
        {/* STICKY HEADER */}
        <div className="sticky top-0 z-20 border-b border-black/10 bg-[#F7F7F3]/95 px-6 py-5 backdrop-blur-md sm:px-8">
          <div className="flex items-start justify-between gap-6">

            <div>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.4,
                }}
                className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700"
              >
                Edit Sermon
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.45,
                }}
                className="mt-2 max-w-md text-2xl font-medium tracking-[-0.035em]"
              >
                {editingSermon.title}
              </motion.h2>
            </div>

            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-lg transition-colors hover:bg-black hover:text-white"
              aria-label="Close"
            >
              ×
            </button>

          </div>
        </div>


        {/* FORM */}
        <form
          onSubmit={handleUpdateSermon}
          className="px-6 pb-32 pt-8 sm:px-8"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.18,
                },
              },
            }}
            className="space-y-8"
          >

            {/* TITLE */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.45,
              }}
            >
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                Sermon Title
              </label>

              <input
                type="text"
                value={editTitle}
                onChange={(event) =>
                  setEditTitle(
                    event.target.value
                  )
                }
                required
                className="w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-green-700"
              />
            </motion.div>


            {/* CATEGORY + DATE */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.45,
              }}
              className="grid gap-6 sm:grid-cols-2"
            >

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                  Category
                </label>

                <select
                  value={editCategory}
                  onChange={(event) => {
                    setEditCategory(
                      event.target.value
                    );

                    if (
                      event.target.value !==
                      "Others"
                    ) {
                      setEditCustomCategory(
                        ""
                      );
                    }
                  }}
                  className="w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-green-700"
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

                <AnimatePresence>
                  {editCategory ===
                    "Others" && (
                    <motion.div
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
                      transition={{
                        duration: 0.25,
                      }}
                      className="overflow-hidden"
                    >
                      <input
                        type="text"
                        value={
                          editCustomCategory
                        }
                        onChange={(event) =>
                          setEditCustomCategory(
                            event.target
                              .value
                          )
                        }
                        required
                        placeholder="Programme name"
                        className="mt-3 w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-green-700"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


              {/* DATE */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                  Sermon Date
                </label>

                <input
                  type="date"
                  value={editSermonDate}
                  onChange={(event) =>
                    setEditSermonDate(
                      event.target.value
                    )
                  }
                  required
                  className="w-full border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-green-700"
                />
              </div>

            </motion.div>


            {/* FLYER */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.45,
              }}
            >
              <div className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                  Sermon Flyer
                </p>

                <p className="mt-1 text-xs text-black/35">
                  Uploading another image will
                  replace the current flyer.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-[130px_1fr]">

                {/* CURRENT FLYER */}
                <div className="overflow-hidden border border-black/10 bg-white">
                  {editingSermon.image_url ? (
                    <img
                      src={
                        editingSermon.image_url
                      }
                      alt={
                        editingSermon.title
                      }
                      className="aspect-[4/5] h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center bg-black px-3 text-center">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/70">
                        No Flyer
                      </p>
                    </div>
                  )}
                </div>


                {/* REPLACE FLYER */}
                <div className="flex flex-col justify-center">

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) =>
                      setEditImageFile(
                        event.target
                          .files?.[0] ??
                          null
                      )
                    }
                    className="w-full border border-dashed border-black/15 bg-white p-5 text-sm text-black/50"
                  />

                  <AnimatePresence mode="wait">
                    {editImageFile ? (
                      <motion.p
                        key="new-flyer"
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="mt-3 text-xs font-medium text-green-700"
                      >
                        New flyer:{" "}
                        {editImageFile.name}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="current-flyer"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        className="mt-3 text-xs text-black/35"
                      >
                        Leave empty to keep
                        the current flyer.
                      </motion.p>
                    )}
                  </AnimatePresence>

                </div>

              </div>
            </motion.div>


            {/* AUDIO */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.45,
              }}
            >
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                Sermon Audio
              </label>

              <div className="border border-black/10 bg-white p-5">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-semibold text-white">
                    ▶
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium">
                      Current audio
                    </p>

                    <p className="mt-1 truncate text-[11px] text-black/35">
                      {editingSermon.audio_path ??
                        "Existing sermon audio"}
                    </p>
                  </div>

                </div>

                <input
                  type="file"
                  accept="audio/*,.mp3,.m4a"
                  onChange={(event) =>
                    setEditAudioFile(
                      event.target
                        .files?.[0] ??
                        null
                    )
                  }
                  className="w-full border border-dashed border-black/15 p-4 text-sm text-black/50"
                />

                <AnimatePresence mode="wait">
                  {editAudioFile ? (
                    <motion.p
                      key="new-audio"
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="mt-3 text-xs font-medium text-green-700"
                    >
                      New audio:{" "}
                      {editAudioFile.name}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="current-audio"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="mt-3 text-xs text-black/35"
                    >
                      Leave empty to keep
                      the current audio.
                    </motion.p>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>


            {/* FEATURED */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.45,
              }}
              className="border-y border-black/10 py-6"
            >
              <label className="flex cursor-pointer items-start gap-4">

                <input
                  type="checkbox"
                  checked={editFeatured}
                  onChange={(event) =>
                    setEditFeatured(
                      event.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-green-700"
                />

                <div>
                  <p className="text-sm font-medium">
                    Featured sermon
                  </p>

                  <p className="mt-1 text-xs leading-5 text-black/40">
                    Display this sermon as
                    the featured message on
                    the sermons page.
                  </p>
                </div>

              </label>
            </motion.div>

          </motion.div>


          {/* BOTTOM ACTION BAR */}
          <div className="fixed bottom-0 right-0 z-30 w-full border-t border-black/10 bg-white/95 px-6 py-4 backdrop-blur-md sm:max-w-[620px] sm:px-8">

            <div className="flex gap-3">

              <button
                type="button"
                onClick={
                  handleCancelEdit
                }
                disabled={isEditing}
                className="flex-1 border border-black/10 px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-black/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isEditing}
                className="flex-[1.4] bg-black px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isEditing
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </form>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </main>
  );
};

export default AdminSermonsPage;