# Book PDFs

Drop each book's PDF in this folder. Anything in `public/` is served from the
site root, so `public/books/my-book.pdf` is reachable at `/books/my-book.pdf`.

## Adding a book's PDF — 2 steps

1. Copy the file here. Use a lowercase, hyphenated name with no spaces:

   ```
   public/books/ai-for-beginners.pdf
   ```

2. Point the book at it in `src/data/books.js` — find the book by `id` and set
   `pdfUrl` to the path from the site root:

   ```js
   pdfUrl: '/books/ai-for-beginners.pdf',
   ```

That's it. The book now shows a **Read Now** button and is readable in-app at
`/textbooks/<id>/read`.

`pdfUrl: null` means no file is attached yet — the reader shows a clear
"PDF not uploaded yet" message instead of a blank page, so a half-finished
upload never looks broken to a user.

## Things worth knowing

- **These files are public.** Anyone with the URL can open or download them,
  with no login. That is the intended behaviour for now. If a paid book should
  ever be restricted, the files need to move to storage that can issue signed,
  expiring URLs (Supabase Storage, Vercel Blob, S3) — the reader component
  itself would not change, only the `pdfUrl` string.

- **Keep the total size sane.** These PDFs are committed to git, and git keeps
  every version forever. A few MB per book is fine; if the whole folder heads
  past ~100 MB, move to cloud storage instead of growing the repo.

- **Adding a PDF needs a deploy.** Because the files live in the repo, a new
  book means a commit + push. If files need to be uploaded without a deploy,
  that is the point to move to cloud storage plus a small admin upload page.

## Rendering

The reader uses PDF.js (`react-pdf`) and paints pages onto a `<canvas>`.
This is deliberate: mobile Chrome and Safari do **not** render a PDF inside an
`<iframe>` or `<embed>` — they download the file instead, leaving a blank
frame. Canvas rendering is what makes the reader work on a phone.
