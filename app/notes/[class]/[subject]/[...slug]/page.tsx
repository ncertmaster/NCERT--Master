export default async function NotesPage({
  params,
}: {
  params: Promise<any>
}) {
  const { class: className, subject, slug } = await params

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes Page</h1>
      <p>Class: {className}</p>
      <p>Subject: {subject}</p>
      <p>Slug: {JSON.stringify(slug)}</p>
    </div>
  )
}
