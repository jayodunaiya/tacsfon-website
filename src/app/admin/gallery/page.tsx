"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiCheck,
  FiImage,
  FiSearch,
  FiStar,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";
import { getGalleryImages } from "@/lib/gallery";
import { GalleryImage } from "@/types/gallery.types";

const categories = [
  "Sunday Service",
  "Conferences",
  "Outreach",
  "Fellowship",
  "Special Programmes",
  "Others",
];

interface SelectedImage {
  id: string;
  file: File;
  preview: string;
}

const formatDate = (value: string | null) => {
  if (!value) return "No date";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
};

const AdminGalleryPage = () => {
  const router = useRouter();

  const [gallery, setGallery] = useState<GalleryImage[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const [category, setCategory] = useState("Sunday Service");
  const [customCategory, setCustomCategory] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [uploadProgress, setUploadProgress] = useState({
    current: 0,
    total: 0,
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [deleteTarget, setDeleteTarget] =
    useState<GalleryImage | null>(null);

  const [deleting, setDeleting] = useState(false);

  /* ==========================================
     LOAD + AUTH
  ========================================== */

  const loadGallery = async () => {
    const images = await getGalleryImages();
    setGallery(images);
  };

  useEffect(() => {
    let mounted = true;

    const initialise = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: isAdmin, error } =
        await supabase.rpc("is_admin");

      if (error || !isAdmin) {
        router.replace("/admin/login");
        return;
      }

      const images = await getGalleryImages();

      if (mounted) {
        setGallery(images);
        setLoading(false);
      }
    };

    initialise();

    return () => {
      mounted = false;
    };
  }, [router]);

  /* ==========================================
     SELECT IMAGES
  ========================================== */

  const handleImageSelection = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setErrorMessage("");
    setMessage("");

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== files.length) {
      setErrorMessage(
        "Some files were skipped because they were not images."
      );
    }

    const newImages: SelectedImage[] = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((previous) => [
      ...previous,
      ...newImages,
    ]);

    event.target.value = "";
  };

  /* ==========================================
     REMOVE SELECTED IMAGE
  ========================================== */

  const removeSelectedImage = (id: string) => {
    setSelectedImages((previous) => {
      const image = previous.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return previous.filter((item) => item.id !== id);
    });
  };

  /* ==========================================
     CLEAR SELECTION
  ========================================== */

  const clearSelection = () => {
    selectedImages.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });

    setSelectedImages([]);
  };

  /* ==========================================
     CLEAN PREVIEWS ON UNMOUNT
  ========================================== */

  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [selectedImages]);

  /* ==========================================
     UPLOAD
  ========================================== */

  const handleUpload = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!selectedImages.length) {
      setErrorMessage(
        "Select at least one image before uploading."
      );
      return;
    }

    const finalCategory =
      category === "Others"
        ? customCategory.trim()
        : category;

    if (!finalCategory) {
      setErrorMessage("Enter a category name.");
      return;
    }

    setUploading(true);

    setUploadProgress({
      current: 0,
      total: selectedImages.length,
    });

    let successfulUploads = 0;

    try {
      /*
       * Sequential upload is intentional.
       * It avoids firing a large number of storage
       * requests simultaneously when an admin uploads
       * many photographs.
       */
      for (let index = 0; index < selectedImages.length; index++) {
        const selected = selectedImages[index];
        const file = selected.file;

        setUploadProgress({
          current: index + 1,
          total: selectedImages.length,
        });

        const extension =
          file.name.split(".").pop()?.toLowerCase() || "jpg";

        const filePath =
          `photos/${Date.now()}-${crypto.randomUUID()}.${extension}`;

        /* -------------------------------
           STORAGE UPLOAD
        -------------------------------- */

        const { error: uploadError } =
          await supabase.storage
            .from("gallery")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
              contentType:
                file.type || "application/octet-stream",
            });

        if (uploadError) {
          throw new Error(
            `Unable to upload "${file.name}": ${uploadError.message}`
          );
        }

        /* -------------------------------
           PUBLIC URL
        -------------------------------- */

        const { data: publicUrlData } =
          supabase.storage
            .from("gallery")
            .getPublicUrl(filePath);

        const imageUrl = publicUrlData.publicUrl;

        /* -------------------------------
           DATABASE ROW
        -------------------------------- */

        const { error: insertError } =
          await supabase
            .from("gallery")
            .insert({
              title: null,
              category: finalCategory,
              image_url: imageUrl,
              image_path: filePath,
              event_date: eventDate || null,
              featured: false,
            });

        if (insertError) {
          /*
           * If database insertion fails after the
           * Storage upload succeeds, remove the orphan
           * image from Storage.
           */
          await supabase.storage
            .from("gallery")
            .remove([filePath]);

          throw new Error(
            `Unable to save "${file.name}": ${insertError.message}`
          );
        }

        successfulUploads += 1;
      }

      clearSelection();

      setEventDate("");
      setCustomCategory("");
      setCategory("Sunday Service");

      await loadGallery();

      setMessage(
        successfulUploads === 1
          ? "1 photo uploaded successfully."
          : `${successfulUploads} photos uploaded successfully.`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading.";

      setErrorMessage(message);

      /*
       * Refresh so successfully uploaded images
       * before the failure still appear.
       */
      await loadGallery();
    } finally {
      setUploading(false);

      setUploadProgress({
        current: 0,
        total: 0,
      });
    }
  };

  /* ==========================================
     FEATURED TOGGLE
  ========================================== */

  const toggleFeatured = async (
    image: GalleryImage
  ) => {
    setMessage("");
    setErrorMessage("");

    const newValue = !image.featured;

    /*
     * Gallery intentionally allows several images
     * to be featured. The homepage can therefore
     * display a curated group rather than only one.
     */
    const { error } = await supabase
      .from("gallery")
      .update({
        featured: newValue,
      })
      .eq("id", image.id);

    if (error) {
      setErrorMessage(
        `Unable to update photo: ${error.message}`
      );
      return;
    }

    setGallery((previous) =>
      previous.map((item) =>
        item.id === image.id
          ? {
              ...item,
              featured: newValue,
            }
          : item
      )
    );
  };

  /* ==========================================
     DELETE
  ========================================== */

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    setMessage("");
    setErrorMessage("");

    /*
     * Delete database row first.
     *
     * If Storage deletion fails afterwards,
     * we may have an unused file, but the public
     * Gallery will not contain a broken DB record.
     */
    const { error: databaseError } =
      await supabase
        .from("gallery")
        .delete()
        .eq("id", deleteTarget.id);

    if (databaseError) {
      setErrorMessage(
        `Unable to delete photo: ${databaseError.message}`
      );

      setDeleting(false);
      return;
    }

    const { error: storageError } =
      await supabase.storage
        .from("gallery")
        .remove([deleteTarget.image_path]);

    if (storageError) {
      console.error(
        "Gallery Storage cleanup failed:",
        storageError
      );
    }

    setGallery((previous) =>
      previous.filter(
        (item) => item.id !== deleteTarget.id
      )
    );

    setDeleteTarget(null);
    setDeleting(false);

    setMessage("Photo deleted successfully.");
  };

  /* ==========================================
     FILTERS
  ========================================== */

  const availableCategories = useMemo(() => {
    return Array.from(
      new Set(gallery.map((image) => image.category))
    ).sort();
  }, [gallery]);

  const filteredGallery = useMemo(() => {
    const query = search.trim().toLowerCase();

    return gallery.filter((image) => {
      const matchesCategory =
        filter === "All" ||
        image.category === filter;

      const matchesSearch =
        !query ||
        image.category
          .toLowerCase()
          .includes(query) ||
        image.title
          ?.toLowerCase()
          .includes(query) ||
        image.event_date
          ?.toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [gallery, filter, search]);

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-black/10 border-t-green-700" />

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Loading Gallery
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-[1500px]">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="border-b border-black/10 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-green-700">
                Media Library
              </p>

              <h1 className="mt-3 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                Gallery
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                Upload and organise photographs from services,
                programmes and fellowship moments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="border border-black/10 bg-white px-4 py-3">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  Photos
                </p>

                <p className="mt-1 text-xl font-medium">
                  {gallery.length}
                </p>
              </div>

              <div className="border border-black/10 bg-white px-4 py-3">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  Featured
                </p>

                <p className="mt-1 text-xl font-medium">
                  {
                    gallery.filter(
                      (image) => image.featured
                    ).length
                  }
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ==========================================
            UPLOAD AREA
        ========================================== */}

        <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

          <form
            onSubmit={handleUpload}
            className="border border-black/10 bg-white"
          >

            {/* UPLOAD HEADER */}

            <div className="flex items-center gap-4 border-b border-black/10 px-5 py-5 sm:px-7">

              <div className="flex h-10 w-10 items-center justify-center bg-green-700 text-white">
                <FiUploadCloud />
              </div>

              <div>
                <h2 className="text-lg font-medium">
                  Upload Photos
                </h2>

                <p className="mt-1 text-xs text-black/40">
                  Upload several photographs at once.
                </p>
              </div>

            </div>

            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

              {/* ==================================
                  DETAILS
              ================================== */}

              <div className="border-b border-black/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">

                <div className="space-y-6">

                  {/* CATEGORY */}

                  <div>
                    <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                      Collection
                    </label>

                    <select
                      value={category}
                      onChange={(event) =>
                        setCategory(event.target.value)
                      }
                      disabled={uploading}
                      className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-3 text-sm outline-none transition focus:border-green-700"
                    >
                      {categories.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* CUSTOM CATEGORY */}

                  {category === "Others" && (
                    <div>
                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                        Collection Name
                      </label>

                      <input
                        type="text"
                        value={customCategory}
                        onChange={(event) =>
                          setCustomCategory(
                            event.target.value
                          )
                        }
                        placeholder="e.g. Freshers' Welcome"
                        disabled={uploading}
                        className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-green-700"
                      />
                    </div>
                  )}

                  {/* DATE */}

                  <div>
                    <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                      Event Date
                      <span className="ml-2 normal-case tracking-normal text-black/25">
                        Optional
                      </span>
                    </label>

                    <input
                      type="date"
                      value={eventDate}
                      onChange={(event) =>
                        setEventDate(event.target.value)
                      }
                      disabled={uploading}
                      className="w-full border border-black/10 bg-[#F7F7F3] px-4 py-3 text-sm outline-none transition focus:border-green-700"
                    />
                  </div>

                  <div className="border-t border-black/10 pt-5">
                    <p className="text-xs leading-5 text-black/40">
                      The selected collection and date will be
                      applied to every photograph in this batch.
                    </p>
                  </div>

                </div>

              </div>

              {/* ==================================
                  IMAGE SELECTOR
              ================================== */}

              <div className="p-5 sm:p-7">

                {selectedImages.length === 0 ? (

                  <label className="group flex min-h-[300px] cursor-pointer flex-col items-center justify-center border border-dashed border-black/15 bg-[#F7F7F3] px-6 text-center transition hover:border-green-700 hover:bg-green-50/30">

                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white text-xl transition group-hover:border-green-700 group-hover:text-green-700">
                      <FiImage />
                    </span>

                    <p className="mt-5 text-sm font-medium">
                      Select photographs
                    </p>

                    <p className="mt-2 max-w-xs text-xs leading-5 text-black/40">
                      Choose multiple JPG, PNG, WEBP or other
                      supported image files.
                    </p>

                    <span className="mt-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-green-700">
                      Browse Images
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelection}
                      disabled={uploading}
                      className="hidden"
                    />

                  </label>

                ) : (

                  <div>

                    {/* SELECTION HEADER */}

                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">

                      <div>
                        <p className="text-sm font-medium">
                          {selectedImages.length}{" "}
                          {selectedImages.length === 1
                            ? "photo"
                            : "photos"}{" "}
                          selected
                        </p>

                        <p className="mt-1 text-xs text-black/35">
                          Review before uploading.
                        </p>
                      </div>

                      {!uploading && (
                        <div className="flex items-center gap-3">

                          <button
                            type="button"
                            onClick={clearSelection}
                            className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/40 transition hover:text-black"
                          >
                            Clear
                          </button>

                          <label className="cursor-pointer border border-black/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition hover:border-green-700 hover:text-green-700">
                            Add More

                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageSelection}
                              className="hidden"
                            />
                          </label>

                        </div>
                      )}

                    </div>

                    {/* PREVIEW GRID */}

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">

                      {selectedImages.map((image) => (
                        <div
                          key={image.id}
                          className="group relative aspect-square overflow-hidden bg-black"
                        >
                          <img
                            src={image.preview}
                            alt={image.file.name}
                            className="h-full w-full object-cover"
                          />

                          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />

                          {!uploading && (
                            <button
                              type="button"
                              onClick={() =>
                                removeSelectedImage(
                                  image.id
                                )
                              }
                              aria-label="Remove image"
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-black/70 text-xs text-white opacity-100 transition hover:bg-black sm:opacity-0 sm:group-hover:opacity-100"
                            >
                              <FiX />
                            </button>
                          )}

                        </div>
                      ))}

                    </div>

                  </div>

                )}

              </div>

            </div>

            {/* ==================================
                FORM FOOTER
            ================================== */}

            <div className="flex flex-col gap-4 border-t border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

              <div>

                {uploading ? (
                  <div>
                    <p className="text-xs font-medium">
                      Uploading photo{" "}
                      {uploadProgress.current} of{" "}
                      {uploadProgress.total}
                    </p>

                    <div className="mt-2 h-1 w-48 overflow-hidden bg-black/10">
                      <div
                        className="h-full bg-green-700 transition-all duration-300"
                        style={{
                          width: `${
                            uploadProgress.total
                              ? (uploadProgress.current /
                                  uploadProgress.total) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-black/35">
                    {selectedImages.length
                      ? `${selectedImages.length} ready to upload`
                      : "No photographs selected"}
                  </p>
                )}

              </div>

              <button
                type="submit"
                disabled={
                  uploading ||
                  selectedImages.length === 0
                }
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-black px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {uploading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/30 border-t-white" />
                    Uploading
                  </>
                ) : (
                  <>
                    <FiUploadCloud />
                    Upload{" "}
                    {selectedImages.length > 0
                      ? selectedImages.length
                      : ""}{" "}
                    {selectedImages.length === 1
                      ? "Photo"
                      : "Photos"}
                  </>
                )}
              </button>

            </div>

          </form>

          {/* ==========================================
              MESSAGES
          ========================================== */}

          {message && (
            <div className="mt-5 flex items-center gap-3 border border-green-700/20 bg-green-50 px-4 py-3 text-sm text-green-800">
              <FiCheck />
              {message}
            </div>
          )}

          {errorMessage && (
            <div className="mt-5 border border-black/10 bg-white px-4 py-3 text-sm text-black/65">
              {errorMessage}
            </div>
          )}

        </div>

        {/* ==========================================
            GALLERY MANAGEMENT
        ========================================== */}

        <div className="border-t border-black/10 px-5 py-10 sm:px-8 lg:px-10">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                Library
              </p>

              <h2 className="mt-2 text-3xl font-medium tracking-[-0.035em]">
                Uploaded Photos
              </h2>
            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-sm">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search gallery..."
                className="w-full border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/25 focus:border-green-700"
              />

            </div>

          </div>

          {/* CATEGORY FILTERS */}

          {availableCategories.length > 0 && (
            <div className="mt-7 flex gap-2 overflow-x-auto pb-2">

              <button
                type="button"
                onClick={() => setFilter("All")}
                className={`shrink-0 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] transition ${
                  filter === "All"
                    ? "bg-black text-white"
                    : "border border-black/10 bg-white text-black/45 hover:border-green-700 hover:text-green-700"
                }`}
              >
                All
              </button>

              {availableCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`shrink-0 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] transition ${
                    filter === item
                      ? "bg-black text-white"
                      : "border border-black/10 bg-white text-black/45 hover:border-green-700 hover:text-green-700"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>
          )}

          {/* ==========================================
              IMAGES
          ========================================== */}

          {filteredGallery.length > 0 ? (

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

              {filteredGallery.map((image) => (

                <article
                  key={image.id}
                  className="group overflow-hidden border border-black/10 bg-white"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/5] overflow-hidden bg-black">

                    <img
                      src={image.image_url}
                      alt={
                        image.title ??
                        image.category
                      }
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {image.featured && (
                      <span className="absolute left-3 top-3 flex items-center gap-2 bg-green-700 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-white">
                        <FiStar />
                        Featured
                      </span>
                    )}

                  </div>

                  {/* INFO */}

                  <div className="p-4">

                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-700">
                      {image.category}
                    </p>

                    <p className="mt-2 text-xs text-black/40">
                      {formatDate(image.event_date)}
                    </p>

                    {/* ACTIONS */}

                    <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">

                      <button
                        type="button"
                        onClick={() =>
                          toggleFeatured(image)
                        }
                        className={`flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] transition ${
                          image.featured
                            ? "text-green-700"
                            : "text-black/40 hover:text-green-700"
                        }`}
                      >
                        <FiStar />

                        {image.featured
                          ? "Featured"
                          : "Feature"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget(image)
                        }
                        className="flex h-8 w-8 items-center justify-center text-red-600 transition hover:bg-red-50"
                        aria-label="Delete photo"
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center border border-dashed border-black/10 bg-white px-6 text-center">

              <FiImage className="text-2xl text-black/20" />

              <h3 className="mt-4 text-lg font-medium">
                {gallery.length
                  ? "No matching photographs"
                  : "Your gallery is empty"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-black/40">
                {gallery.length
                  ? "Try changing your search or collection filter."
                  : "Upload photographs above and they will appear here."}
              </p>

            </div>

          )}

        </div>

      </div>

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md bg-white p-6 sm:p-8">

            <div className="flex h-11 w-11 items-center justify-center bg-red-50 text-red-600">
              <FiTrash2 />
            </div>

            <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">
              Delete this photo?
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/45">
              This will permanently remove the photograph
              from the Gallery and Storage. This action
              cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">

              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="flex-1 border border-black/10 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] transition hover:border-black"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="flex-1 bg-red-600 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Photo"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default AdminGalleryPage;