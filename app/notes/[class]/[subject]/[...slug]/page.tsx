export default function NotesPage(props: any) {
  return (
    <div style={{ padding: "20px" }}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}
