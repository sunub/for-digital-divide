import { memo } from 'react';

function Icon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 -960 960 960"
    >
      <path d="M120-160v-112q0-34 17.5-62.5T184-378q62-31 126-46.5T440-440q20 0 40 1.5t40 4.5q-4 58 21 109.5t73 84.5v80zM760-40l-60-60v-186q-44-13-72-49.5T600-420q0-58 41-99t99-41 99 41 41 99q0 45-25.5 80T790-290l50 50-60 60 60 60zM440-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47m300 80q17 0 28.5-11.5T780-440t-11.5-28.5T740-480t-28.5 11.5T700-440t11.5 28.5T740-400" />
    </svg>
  );
}

const PasskeyIcon = memo(Icon);

export { PasskeyIcon };
