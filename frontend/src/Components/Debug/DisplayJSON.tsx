export default function DisplayJSON(props: any): JSX.Element {
  const { value } = props;

  return (
    <pre className="absolute inset-0">{JSON.stringify(value, null, 2)}</pre>
  );
}
