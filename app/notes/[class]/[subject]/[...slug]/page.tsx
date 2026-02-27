export default function NotesPage({ params }: any) {
  return (
    <div style={{ padding: "20px" }}>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}
