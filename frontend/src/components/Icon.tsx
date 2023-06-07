export default function Icon(props: {
  size: number;
  color: string;
  userName: string;
}) {
  return (
    <div
      className={`rounded-full w-${props.size} h-${props.size} flex items-center justify-center`}
      style={{ backgroundColor: `#${props.color}` }}
    >
      <h2 className="text-white text-2xl">
        {props.userName ? props.userName.split('')[0].toUpperCase() : ''}
      </h2>
    </div>
  );
}