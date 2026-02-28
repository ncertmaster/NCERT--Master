export default function Page({ params }: any) {
  return (
    <div style={{ padding: 20 }}>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}
