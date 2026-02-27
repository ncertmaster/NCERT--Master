export default function NotesPage({ params }: { params: any }) {
  const { class: className, subject, slug } = params || {}

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes Page</h1>
      <p>Class: {className}</p>
      <p>Subject: {subject}</p>
      <p>Slug: {JSON.stringify(slug)}</p>
    </div>
  )
}
