import Image from "next/image";
import { Container } from "@/components/blog/Container";
import building from "../../public/img/building.png";

export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
              Projectxwire , web veya mobil uygulama üzerinden ulaşabilirsiniz.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Panele gidebilir veya ios cihazlarınız için App store veya Android
              için Play store den indirebilirsiniz.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://play.google.com/store/apps?gl=TR"
                target="_blank"
                rel="noopener"
                className="flex items-center space-x-2 px-8 py-4 text-lg font-medium text-center text-white bg-orange-600 rounded-md "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <linearGradient
                    id="jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1"
                    x1="1688.489"
                    x2="1685.469"
                    y1="-883.003"
                    y2="-881.443"
                    gradientTransform="matrix(11.64 0 0 22.55 -19615.32 19904.924)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#047ed6"></stop>
                    <stop offset="1" stopColor="#50e6ff"></stop>
                  </linearGradient>
                  <path
                    fill="url(#jFdG-76_seIEvf-hbjSsaa_rZwnRdJyYqRi_gr1)"
                    fillRule="evenodd"
                    d="M7.809,4.608c-0.45,0.483-0.708,1.227-0.708,2.194	v34.384c0,0.967,0.258,1.711,0.725,2.177l0.122,0.103L27.214,24.2v-0.433L7.931,4.505L7.809,4.608z"
                    clipRule="evenodd"
                  ></path>
                  <linearGradient
                    id="jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2"
                    x1="1645.286"
                    x2="1642.929"
                    y1="-897.055"
                    y2="-897.055"
                    gradientTransform="matrix(9.145 0 0 7.7 -15001.938 6931.316)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#ffda1c"></stop>
                    <stop offset="1" stopColor="#feb705"></stop>
                  </linearGradient>
                  <path
                    fill="url(#jFdG-76_seIEvf-hbjSsab_rZwnRdJyYqRi_gr2)"
                    fillRule="evenodd"
                    d="M33.623,30.647l-6.426-6.428v-0.45l6.428-6.428	l0.139,0.086l7.603,4.321c2.177,1.227,2.177,3.249,0,4.493l-7.603,4.321C33.762,30.561,33.623,30.647,33.623,30.647z"
                    clipRule="evenodd"
                  ></path>
                  <linearGradient
                    id="jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3"
                    x1="1722.978"
                    x2="1720.622"
                    y1="-889.412"
                    y2="-886.355"
                    gradientTransform="matrix(15.02 0 0 11.5775 -25848.943 10324.73)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#d9414f"></stop>
                    <stop offset="1" stopColor="#8c193f"></stop>
                  </linearGradient>
                  <path
                    fill="url(#jFdG-76_seIEvf-hbjSsac_rZwnRdJyYqRi_gr3)"
                    fillRule="evenodd"
                    d="M33.762,30.561l-6.565-6.567L7.809,43.382	c0.708,0.761,1.9,0.847,3.232,0.103L33.762,30.561"
                    clipRule="evenodd"
                  ></path>
                  <linearGradient
                    id="jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4"
                    x1="1721.163"
                    x2="1722.215"
                    y1="-891.39"
                    y2="-890.024"
                    gradientTransform="matrix(15.02 0 0 11.5715 -25848.943 10307.886)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#33c481"></stop>
                    <stop offset="1" stopColor="#61e3a7"></stop>
                  </linearGradient>
                  <path
                    fill="url(#jFdG-76_seIEvf-hbjSsad_rZwnRdJyYqRi_gr4)"
                    fillRule="evenodd"
                    d="M33.762,17.429L11.041,4.522	c-1.33-0.761-2.524-0.658-3.232,0.103l19.386,19.369L33.762,17.429z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Google Play Store</span>
              </a>
              <a
                href="https://github.com/web3templates/nextly-template/"
                target="_blank"
                rel="noopener"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="35"
                  height="35"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#2196f3"
                    d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M31.684 23.867l-2.48 1.441L22.43 13.652c-.27-.465-.113-1.063.355-1.336l.793-.461c.465-.27 1.063-.113 1.332.355L31.684 23.867zM29.48 25.789l2.48-1.441 1.438 2.469-2.48 1.441L29.48 25.789zM13.84 28.152l5.988-10.246 2.555 1.492-5.988 10.246L13.84 28.152zM12.285 33.375l1.234-4.676 2.555 1.496-3.469 3.367c-.059.063-.156.074-.23.031C12.297 33.547 12.262 33.461 12.285 33.375M20.035 17.547l.863-1.469c.27-.469.871-.625 1.336-.352l.867.508c.465.273.621.871.348 1.336l-.859 1.473L20.035 17.547zM33.023 27.578c-.402.23-1.004.586-1.359.797-.664.395-.152 1.559 0 1.809.859 1.441 1.746 1.238 2.414 2.258.367.559.266.805.379.992.047.066.191.133.246.055 1.031-1.426.73-3.879-.02-4.973C34.336 28.004 33.703 27.191 33.023 27.578M36.637 25.41h-3.563l-1.555-2.855h5.117V25.41zM28.617 25.41h-9.293l1.586-2.855h6.121L28.617 25.41zM14.945 25.41h-3.617v-2.855h5.309L14.945 25.41z"
                  ></path>
                </svg>
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={building}
              width="900"
              height="850"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}