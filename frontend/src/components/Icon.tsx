export default function Icon(props: {
  size: number;
  color: string;
  userName: string;
}) {
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        backgroundColor: `#${props.color}`,
        width: `${props.size * 0.25}rem`,
        height: `${props.size * 0.25}rem`,
      }}
    >
      <h2
        className="text-white"
        style={{ fontSize: `${props.size * 0.17}rem` }}
      >
        {props.userName ? props.userName.split('')[0].toUpperCase() : ''}
      </h2>
    </div>
  );
}
