"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowUpRight,
  FiCheck,
  FiEdit2,
  FiFileText,
  FiImage,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";
import { Editorial } from "@/types/editorial.types";

const categories = [
  "Faith",
  "Christian Living",
  "Spiritual Growth",
  "Relationships",
  "Campus Life",
  "Leadership",
  "Others",
];

interface EditorialForm {
  title: string;
  category: string;
  customCategory: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  featured: boolean;
}

const emptyForm: EditorialForm = {
  title: "",
  category: "Faith",
  customCategory: "",
  excerpt: "",
  content: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  featured: false,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const AdminEditorialPage = () => {
  const router = useRouter();

  const [editorials, setEditorials] = useState<Editorial[]>([]);
  const [form, setForm] = useState<EditorialForm>(emptyForm);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [editingEditorial, setEditingEditorial] =
    useState<Editorial | null>(null);

  const [editForm, setEditForm] =
    useState<EditorialForm>(emptyForm);

  const [editCoverFile, setEditCoverFile] =
    useState<File | null>(null);

  const [editCoverPreview, setEditCoverPreview] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [deleteTarget, setDeleteTarget] =
    useState<Editorial | null>(null);

  const [deleting, setDeleting] = useState(false);

  /* ==========================================
      FETCH EDITORIALS
  ========================================== */

  const fetchEditorials = async () => {
    const { data, error: fetchError } = await supabase
      .from("editorials")
      .select("*")
      .order("published_at", { ascending: false });

    if (fetchError) {
      console.error(fetchError);
      setError("Unable to load editorial publications.");
      return;
    }

    setEditorials(data ?? []);
  };

  /* ==========================================
      ADMIN AUTH
  ========================================== */

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

      if (adminError || !isAdmin) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      await fetchEditorials();

      setLoading(false);
    };

    initialize();
  }, [router]);

  /* ==========================================
      COVER PREVIEW CLEANUP
  ========================================== */

  useEffect(() => {
    return () => {
      if (coverPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  useEffect(() => {
    return () => {
      if (editCoverPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(editCoverPreview);
      }
    };
  }, [editCoverPreview]);

  /* ==========================================
      SEARCH
  ========================================== */

  const filteredEditorials = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return editorials;
    }

    return editorials.filter((editorial) => {
      return (
        editorial.title.toLowerCase().includes(query) ||
        editorial.category.toLowerCase().includes(query) ||
        editorial.excerpt?.toLowerCase().includes(query)
      );
    });
  }, [editorials, search]);

  /* ==========================================
      COVER CHANGE
  ========================================== */

  const handleCoverChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (coverPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleEditCoverChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (editCoverPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(editCoverPreview);
    }

    setEditCoverFile(file);
    setEditCoverPreview(URL.createObjectURL(file));
    setError("");
  };

  /* ==========================================
      UNIQUE SLUG
  ========================================== */

  const createUniqueSlug = async (
    title: string,
    excludedId?: string
  ) => {
    const baseSlug = slugify(title) || `editorial-${Date.now()}`;

    let slug = baseSlug;
    let counter = 2;

    while (true) {
      let query = supabase
        .from("editorials")
        .select("id")
        .eq("slug", slug);

      if (excludedId) {
        query = query.neq("id", excludedId);
      }

      const { data, error: slugError } = await query.limit(1);

      if (slugError) {
        throw slugError;
      }

      if (!data || data.length === 0) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }
  };

  /* ==========================================
      UPLOAD COVER
  ========================================== */

  const uploadCover = async (file: File) => {
    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const filePath = `covers/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("editorial")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "image/jpeg",
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("editorial")
      .getPublicUrl(filePath);

    return {
      imagePath: filePath,
      imageUrl: data.publicUrl,
    };
  };

  /* ==========================================
      CREATE EDITORIAL
  ========================================== */

  const handleCreate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const finalCategory =
      form.category === "Others"
        ? form.customCategory.trim()
        : form.category;

    if (!form.title.trim()) {
      setError("Editorial title is required.");
      return;
    }

    if (!finalCategory) {
      setError("Please enter the editorial category.");
      return;
    }

    if (!form.content.trim()) {
      setError("The full editorial content is required.");
      return;
    }

    if (!coverFile) {
      setError("Please upload a cover image.");
      return;
    }

    try {
      setSaving(true);

      const slug = await createUniqueSlug(form.title);

      const uploadedCover = await uploadCover(coverFile);

      if (form.featured) {
        const { error: featuredError } = await supabase
          .from("editorials")
          .update({
            featured: false,
          })
          .eq("featured", true);

        if (featuredError) {
          await supabase.storage
            .from("editorial")
            .remove([uploadedCover.imagePath]);

          throw featuredError;
        }
      }

      const { error: insertError } = await supabase
        .from("editorials")
        .insert({
          title: form.title.trim(),
          slug,
          category: finalCategory,
          excerpt: form.excerpt.trim() || null,
          content: form.content.trim(),
          image_url: uploadedCover.imageUrl,
          image_path: uploadedCover.imagePath,
          published_at: new Date(
            `${form.publishedAt}T12:00:00`
          ).toISOString(),
          featured: form.featured,
        });

      if (insertError) {
        await supabase.storage
          .from("editorial")
          .remove([uploadedCover.imagePath]);

        throw insertError;
      }

      if (coverPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }

      setForm(emptyForm);
      setCoverFile(null);
      setCoverPreview(null);

      await fetchEditorials();

      setSuccess("Editorial published successfully.");
    } catch (createError) {
      console.error(createError);

      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to publish editorial."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ==========================================
      OPEN EDITOR
  ========================================== */

  const openEditor = (editorial: Editorial) => {
    const isPresetCategory = categories
      .filter((category) => category !== "Others")
      .includes(editorial.category);

    setEditingEditorial(editorial);

    setEditForm({
      title: editorial.title,
      category: isPresetCategory
        ? editorial.category
        : "Others",
      customCategory: isPresetCategory
        ? ""
        : editorial.category,
      excerpt: editorial.excerpt ?? "",
      content: editorial.content,
      publishedAt: editorial.published_at.slice(0, 10),
      featured: editorial.featured,
    });

    setEditCoverFile(null);
    setEditCoverPreview(editorial.image_url);

    setError("");
    setSuccess("");
  };

  const closeEditor = () => {
    if (editCoverPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(editCoverPreview);
    }

    setEditingEditorial(null);
    setEditCoverFile(null);
    setEditCoverPreview(null);
    setEditForm(emptyForm);
  };

  /* ==========================================
      UPDATE EDITORIAL
  ========================================== */

  const handleUpdate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!editingEditorial) return;

    setError("");
    setSuccess("");

    const finalCategory =
      editForm.category === "Others"
        ? editForm.customCategory.trim()
        : editForm.category;

    if (!editForm.title.trim()) {
      setError("Editorial title is required.");
      return;
    }

    if (!finalCategory) {
      setError("Please enter the editorial category.");
      return;
    }

    if (!editForm.content.trim()) {
      setError("The full editorial content is required.");
      return;
    }

    let newImagePath: string | null = null;
    let newImageUrl = editingEditorial.image_url;

    try {
      setEditing(true);

      const slug = await createUniqueSlug(
        editForm.title,
        editingEditorial.id
      );

      if (editCoverFile) {
        const uploadedCover =
          await uploadCover(editCoverFile);

        newImagePath = uploadedCover.imagePath;
        newImageUrl = uploadedCover.imageUrl;
      }

      if (editForm.featured) {
        const { error: featuredError } = await supabase
          .from("editorials")
          .update({
            featured: false,
          })
          .eq("featured", true)
          .neq("id", editingEditorial.id);

        if (featuredError) {
          if (newImagePath) {
            await supabase.storage
              .from("editorial")
              .remove([newImagePath]);
          }

          throw featuredError;
        }
      }

      const { error: updateError } = await supabase
        .from("editorials")
        .update({
          title: editForm.title.trim(),
          slug,
          category: finalCategory,
          excerpt: editForm.excerpt.trim() || null,
          content: editForm.content.trim(),
          image_url: newImageUrl,
          image_path:
            newImagePath ?? editingEditorial.image_path,
          published_at: new Date(
            `${editForm.publishedAt}T12:00:00`
          ).toISOString(),
          featured: editForm.featured,
        })
        .eq("id", editingEditorial.id);

      if (updateError) {
        if (newImagePath) {
          await supabase.storage
            .from("editorial")
            .remove([newImagePath]);
        }

        throw updateError;
      }

      /*
       * Delete the old cover only after the database
       * update succeeds.
       */
      if (
        newImagePath &&
        editingEditorial.image_path &&
        editingEditorial.image_path !== newImagePath
      ) {
        const { error: oldImageError } =
          await supabase.storage
            .from("editorial")
            .remove([editingEditorial.image_path]);

        if (oldImageError) {
          console.error(
            "Could not remove old editorial cover:",
            oldImageError
          );
        }
      }

      await fetchEditorials();

      closeEditor();

      setSuccess("Editorial updated successfully.");
    } catch (updateError) {
      console.error(updateError);

      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update editorial."
      );
    } finally {
      setEditing(false);
    }
  };

  /* ==========================================
      DELETE EDITORIAL
  ========================================== */

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      /*
       * Delete database record first.
       * This prevents a failed database deletion
       * from leaving the article with a broken image.
       */
      const { error: deleteError } = await supabase
        .from("editorials")
        .delete()
        .eq("id", deleteTarget.id);

      if (deleteError) {
        throw deleteError;
      }

      if (deleteTarget.image_path) {
        const { error: imageDeleteError } =
          await supabase.storage
            .from("editorial")
            .remove([deleteTarget.image_path]);

        if (imageDeleteError) {
          console.error(
            "Editorial deleted but cover cleanup failed:",
            imageDeleteError
          );
        }
      }

      setEditorials((current) =>
        current.filter(
          (editorial) =>
            editorial.id !== deleteTarget.id
        )
      );

      setDeleteTarget(null);

      setSuccess("Editorial deleted successfully.");
    } catch (deleteError) {
      console.error(deleteError);

      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete editorial."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* ==========================================
      LOADING
  ========================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f7f3] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
            TACSFON CMS
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.05em] text-black">
            Loading Editorial...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f3] px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1400px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <section className="border-b border-black/10 pb-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                Content Management
              </p>

              <h1 className="mt-5 text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-black sm:text-6xl lg:text-7xl">
                Editorial
                <span className="block text-black/25">
                  Publications.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-black/50">
                Publish articles, teachings and written
                resources for the TACSFON LAUTECH community.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="border border-black/10 bg-white px-5 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/35">
                  Publications
                </p>

                <p className="mt-1 text-2xl font-medium tracking-[-0.04em]">
                  {editorials.length}
                </p>
              </div>

              <Link
                href="/editorial"
                target="_blank"
                className="group flex items-center gap-3 bg-black px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-green-700"
              >
                View Editorial
                <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* ==========================================
            MESSAGES
        ========================================== */}

        {error && (
          <div className="mt-8 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-8 flex items-center gap-3 border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
            <FiCheck />
            {success}
          </div>
        )}

        {/* ==========================================
            CREATE + LIST
        ========================================== */}

        <div className="mt-10 grid gap-10 xl:grid-cols-[0.82fr_1.18fr]">

          {/* ======================================
              CREATE
          ====================================== */}

          <section>
            <div className="bg-white p-6 sm:p-8">

              <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-6">

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                    New Publication
                  </p>

                  <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                    Write an Article
                  </h2>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-white">
                  <FiPlus />
                </span>

              </div>

              <form
                onSubmit={handleCreate}
                className="space-y-6"
              >

                {/* TITLE */}

                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Title *
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Enter publication title"
                    className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none transition focus:border-green-700"
                  />
                </div>

                {/* CATEGORY */}

                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Category *
                  </label>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none transition focus:border-green-700"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {form.category === "Others" && (
                  <div>
                    <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                      Custom Category *
                    </label>

                    <input
                      type="text"
                      value={form.customCategory}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          customCategory:
                            event.target.value,
                        }))
                      }
                      placeholder="Enter category"
                      className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none transition focus:border-green-700"
                    />
                  </div>
                )}

                {/* EXCERPT */}

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                      Excerpt
                    </label>

                    <span className="text-[9px] text-black/30">
                      {form.excerpt.length} characters
                    </span>
                  </div>

                  <textarea
                    value={form.excerpt}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        excerpt: event.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="A short introduction to the article..."
                    className="mt-2 w-full resize-none border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm leading-6 outline-none transition focus:border-green-700"
                  />
                </div>

                {/* CONTENT */}

                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Full Article *
                  </label>

                  <textarea
                    value={form.content}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        content: event.target.value,
                      }))
                    }
                    rows={14}
                    placeholder="Write the full editorial publication here..."
                    className="mt-2 w-full resize-y border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm leading-7 outline-none transition focus:border-green-700"
                  />
                </div>

                {/* DATE */}

                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Publication Date *
                  </label>

                  <input
                    type="date"
                    required
                    value={form.publishedAt}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        publishedAt: event.target.value,
                      }))
                    }
                    className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none transition focus:border-green-700"
                  />
                </div>

                {/* COVER */}

                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Cover Image *
                  </label>

                  <label className="group relative mt-2 block cursor-pointer overflow-hidden border border-dashed border-black/20 bg-[#f7f7f3] transition hover:border-green-700">

                    {coverPreview ? (
                      <div className="relative aspect-[16/9]">
                        <img
                          src={coverPreview}
                          alt="Editorial cover preview"
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/50">
                          <span className="translate-y-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                            Change Image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex min-h-[190px] flex-col items-center justify-center px-5 text-center">
                        <FiUploadCloud className="text-2xl text-green-700" />

                        <p className="mt-4 text-sm font-medium">
                          Upload cover image
                        </p>

                        <p className="mt-1 text-xs text-black/35">
                          JPG, PNG, WEBP
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="sr-only"
                    />
                  </label>
                </div>

                {/* FEATURED */}

                <label className="flex cursor-pointer items-center justify-between border border-black/10 bg-[#f7f7f3] px-4 py-4">

                  <div>
                    <p className="text-sm font-medium">
                      Featured Publication
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      Highlight this article on the website.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        featured: event.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-green-700"
                  />

                </label>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-3 bg-green-700 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Publishing..."
                    : "Publish Editorial"}

                  {!saving && <FiArrowUpRight />}
                </button>

              </form>

            </div>
          </section>

          {/* ======================================
              PUBLICATIONS
          ====================================== */}

          <section>

            <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                  Library
                </p>

                <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em]">
                  Publications
                </h2>
              </div>

              <div className="relative w-full sm:w-72">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search publications..."
                  className="w-full border border-black/10 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-green-700"
                />
              </div>

            </div>

            {/* EMPTY */}

            {filteredEditorials.length === 0 ? (
              <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center border border-black/10 bg-white p-8 text-center">
                <FiFileText className="text-3xl text-black/20" />

                <p className="mt-4 text-lg font-medium">
                  No publications found.
                </p>

                <p className="mt-2 text-sm text-black/40">
                  {search
                    ? "Try a different search."
                    : "Your published editorials will appear here."}
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">

                {filteredEditorials.map((editorial) => (
                  <article
                    key={editorial.id}
                    className="group bg-white p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">

                      {/* IMAGE */}

                      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-black/5 sm:w-40">

                        {editorial.image_url ? (
                          <img
                            src={editorial.image_url}
                            alt={editorial.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-black/20">
                            <FiImage />
                          </div>
                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="flex min-w-0 flex-1 flex-col justify-between">

                        <div>
                          <div className="flex flex-wrap items-center gap-2">

                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-green-700">
                              {editorial.category}
                            </span>

                            {editorial.featured && (
                              <span className="bg-green-50 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-green-700">
                                Featured
                              </span>
                            )}

                          </div>

                          <h3 className="mt-3 text-xl font-medium leading-tight tracking-[-0.035em]">
                            {editorial.title}
                          </h3>

                          {editorial.excerpt && (
                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/45">
                              {editorial.excerpt}
                            </p>
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                          <p className="text-[10px] uppercase tracking-[0.15em] text-black/30">
                            {formatDate(
                              editorial.published_at
                            )}
                          </p>

                          <div className="flex items-center gap-2">

                            <Link
                              href={`/editorial/${editorial.slug}`}
                              target="_blank"
                              aria-label={`View ${editorial.title}`}
                              className="flex h-9 w-9 items-center justify-center border border-black/10 text-black/50 transition hover:border-green-700 hover:bg-green-700 hover:text-white"
                            >
                              <FiArrowUpRight />
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                openEditor(editorial)
                              }
                              aria-label={`Edit ${editorial.title}`}
                              className="flex h-9 w-9 items-center justify-center border border-black/10 text-black/50 transition hover:border-black hover:bg-black hover:text-white"
                            >
                              <FiEdit2 />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget(editorial)
                              }
                              aria-label={`Delete ${editorial.title}`}
                              className="flex h-9 w-9 items-center justify-center border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>
                  </article>
                ))}

              </div>
            )}

          </section>

        </div>

      </div>

      {/* ==========================================
          EDIT DRAWER
      ========================================== */}

      {editingEditorial && (
        <div className="fixed inset-0 z-[100]">

          <button
            type="button"
            aria-label="Close editor"
            onClick={closeEditor}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/95 px-6 py-5 backdrop-blur-xl sm:px-8">

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                  Editorial
                </p>

                <h2 className="mt-1 text-xl font-medium tracking-[-0.03em]">
                  Edit Publication
                </h2>
              </div>

              <button
                type="button"
                onClick={closeEditor}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
              >
                <FiX />
              </button>

            </div>

            <form
              onSubmit={handleUpdate}
              className="space-y-6 p-6 sm:p-8"
            >

              {/* TITLE */}

              <div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  Title *
                </label>

                <input
                  type="text"
                  value={editForm.title}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  Category *
                </label>

                <select
                  value={editForm.category}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none focus:border-green-700"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {editForm.category === "Others" && (
                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    Custom Category *
                  </label>

                  <input
                    type="text"
                    value={editForm.customCategory}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        customCategory:
                          event.target.value,
                      }))
                    }
                    className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none focus:border-green-700"
                  />
                </div>
              )}

              {/* EXCERPT */}

              <div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  Excerpt
                </label>

                <textarea
                  value={editForm.excerpt}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      excerpt: event.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-2 w-full resize-none border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm leading-6 outline-none focus:border-green-700"
                />
              </div>

              {/* CONTENT */}

              <div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  Full Article *
                </label>

                <textarea
                  value={editForm.content}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      content: event.target.value,
                    }))
                  }
                  rows={16}
                  className="mt-2 w-full resize-y border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm leading-7 outline-none focus:border-green-700"
                />
              </div>

              {/* DATE */}

              <div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  Publication Date *
                </label>

                <input
                  type="date"
                  required
                  value={editForm.publishedAt}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      publishedAt: event.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-black/10 bg-[#f7f7f3] px-4 py-4 text-sm outline-none focus:border-green-700"
                />
              </div>

              {/* COVER */}

              <div>
                <label className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  Cover Image
                </label>

                <label className="group relative mt-2 block cursor-pointer overflow-hidden border border-dashed border-black/20 bg-[#f7f7f3]">

                  {editCoverPreview ? (
                    <div className="relative aspect-[16/9]">
                      <img
                        src={editCoverPreview}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/50">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition group-hover:opacity-100">
                          Replace Cover
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-[180px] flex-col items-center justify-center">
                      <FiUploadCloud className="text-2xl text-green-700" />

                      <p className="mt-3 text-sm">
                        Upload cover
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditCoverChange}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* FEATURED */}

              <label className="flex cursor-pointer items-center justify-between border border-black/10 bg-[#f7f7f3] px-4 py-4">

                <div>
                  <p className="text-sm font-medium">
                    Featured Publication
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    Highlight this publication.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={editForm.featured}
                  onChange={(event) =>
                    setEditForm((current) => ({
                      ...current,
                      featured: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-green-700"
                />

              </label>

              <button
                type="submit"
                disabled={editing}
                className="flex w-full items-center justify-center gap-3 bg-green-700 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black disabled:opacity-50"
              >
                {editing
                  ? "Saving Changes..."
                  : "Save Changes"}

                {!editing && <FiCheck />}
              </button>

            </form>

          </aside>

        </div>
      )}

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      {deleteTarget && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md bg-white p-7 sm:p-8">

            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiTrash2 />
            </span>

            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.25em] text-red-600">
              Delete Publication
            </p>

            <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.05em]">
              Are you sure?
            </h2>

            <p className="mt-4 text-sm leading-6 text-black/50">
              <strong className="font-medium text-black">
                {deleteTarget.title}
              </strong>{" "}
              will be permanently removed from the
              Editorial archive.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">

              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="border border-black/10 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="bg-red-600 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
};

export default AdminEditorialPage;