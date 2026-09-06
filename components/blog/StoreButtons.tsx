import React from "react";

interface StoreButtonsProps {
  idPrefix?: string;
  className?: string;
}

export const StoreButtons: React.FC<StoreButtonsProps> = ({
  idPrefix = "store",
  className = "flex flex-col sm:flex-row items-stretch sm:items-center gap-4",
}) => {
  return (
    <div className={className}>
      {/* Apple App Store - Siyah Zemin */}
      <a
        href="https://apps.apple.com/tr/app/projectxwire/id6720710483?l=tr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-zinc-950 dark:bg-zinc-900 hover:bg-black dark:hover:bg-zinc-800 text-white border border-zinc-800 dark:border-zinc-700 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
      >
        <svg
          viewBox="0 0 384 512"
          width="26"
          height="26"
          fill="currentColor"
          className="flex-shrink-0 text-white group-hover:scale-105 transition-transform"
        >
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 66.7 26.6 122.9c13.7 28.9 31.9 57.4 57.6 84.7 22.8 24.3 43.8 42.6 69.1 42.6 23.9 0 33.7-15.6 65.6-15.6 31.2 0 40.5 15.6 65.6 15.6 25.3 0 46.8-19.5 69.1-42.6 17.5-18.6 31.8-38.4 43.1-59.5-56-21.4-81.5-62.8-81.4-152.9zM224 88.5c16.3-21.2 28.5-47.4 25.1-76.5-24.5 1.5-52.9 16.7-68.9 37.3-14.8 18.9-26.5 45.9-23.2 73.8 27.2 2.1 53.6-15.1 67-34.6z" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium leading-none tracking-wider uppercase text-zinc-400">
            App Store&apos;dan
          </span>
          <span className="text-base font-semibold leading-tight mt-1 text-white">
            İndirin
          </span>
        </div>
      </a>

      {/* Google Play Store - Beyaz Zemin */}
      <a
        href="https://play.google.com/store/apps/details?id=com.projectxwire.apps"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 48 48"
          className="flex-shrink-0 group-hover:scale-105 transition-transform"
        >
          <linearGradient
            id={`${idPrefix}_gp1`}
            x1="1688.489"
            x2="1685.469"
            y1="-883.003"
            y2="-881.443"
            gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#047ed6" />
            <stop offset="1" stopColor="#50e6ff" />
          </linearGradient>
          <path
            fill={`url(#${idPrefix}_gp1)`}
            fillRule="evenodd"
            d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z"
            clipRule="evenodd"
          />
          <linearGradient
            id={`${idPrefix}_gp2`}
            x1="1645.286"
            x2="1642.929"
            y1="-897.055"
            y2="-897.055"
            gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffda1c" />
            <stop offset="1" stopColor="#feb705" />
          </linearGradient>
          <path
            fill={`url(#${idPrefix}_gp2)`}
            fillRule="evenodd"
            d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z"
            clipRule="evenodd"
          />
          <linearGradient
            id={`${idPrefix}_gp3`}
            x1="1722.978"
            x2="1720.622"
            y1="-889.412"
            y2="-886.355"
            gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#d9414f" />
            <stop offset="1" stopColor="#8c193f" />
          </linearGradient>
          <path
            fill={`url(#${idPrefix}_gp3)`}
            fillRule="evenodd"
            d="M33.762,30.561l-6.565-6.567L7.809,43.382c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561"
            clipRule="evenodd"
          />
          <linearGradient
            id={`${idPrefix}_gp4`}
            x1="1721.163"
            x2="1722.215"
            y1="-891.39"
            y2="-890.024"
            gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#33c481" />
            <stop offset="1" stopColor="#61e3a7" />
          </linearGradient>
          <path
            fill={`url(#${idPrefix}_gp4)`}
            fillRule="evenodd"
            d="M33.762,17.429L11.041,4.522c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium leading-none tracking-wider uppercase text-gray-500 dark:text-gray-400">
            Google Play&apos;den
          </span>
          <span className="text-base font-semibold leading-tight mt-1 text-zinc-900 dark:text-white">
            İndirin
          </span>
        </div>
      </a>
    </div>
  );
};
