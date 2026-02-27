export default function NotesPage({ params }: any) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes Page</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}
