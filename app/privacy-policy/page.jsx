"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import PrivacyPolicy from "@components/PrivacyPolicy";
import {
  faDiscord,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen text-white sm:overflow-x-hidden">
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        crossOrigin="anonymous"
      />
      <div className="bg-primary">
        <header className="mx-32 flex justify-between items-center shadow-md p-5 w-full z-10">
          <img
            onClick={() => router.push("/")}
            src="/assets/images/pokestrat-secondary-logo-transparent.png"
            alt="Pokestrat Secondary Logo"
            className="object-contain w-24 cursor-pointer hover:scale-110 transition-scale duration-300 "
          />
        </header>
      </div>

      <div className="mx-40 mb-32 mt-18">
        <PrivacyPolicy />
      </div>

      {/* Footer */}
      <div className="bg-primary">
        <footer className="mx-8 md:mx-16 lg:mx-32 p-5 text-white text-sm md:text-base">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            {/* Left side content */}
            <div className="flex flex-col space-y-4 w-full lg:w-1/3 text-center lg:text-left ">
              <div className="font-semibold text-lg md:text-xl">
                Developer:
                <a
                  href="https://github.com/NEjim2001"
                  className="text-blue-500 cursor-pointer"
                >
                  {" "}
                  Nnanna Ejim
                </a>
              </div>
              <div className="text-base md:text-lg">
                Find PokéStrat useful? Support the continued development and
                consider making a{" "}
                <a
                  href="https://www.paypal.com/donate/?business=JQB5WYHU9T7XU&no_recurring=1&item_name=Pok%C3%A9Strat+Team+Builder&currency_code=USD"
                  className="text-yellow-500 font-bold underline hover:text-yellow-600"
                >
                  donation
                </a>{" "}
                to help us keep improving.
              </div>
              <div className="text-xs md:text-sm">
                <p>
                  Other Helpful Tools:{" "}
                  <span className="text-yellow-500 cursor-pointer">
                    Smogon & PokéApi
                  </span>
                </p>
                <div className="space-x-3 mt-3">
                  <Link
                    href="/privacy-policy"
                    className="text-blue-400 underline"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-of-use"
                    className="text-blue-400 underline"
                  >
                    Terms of Use
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side content */}
            <div className="text-center lg:text-right w-full lg:w-1/3">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-500">
                Join Our Community!
              </h3>
              <p className="text-sm md:text-lg text-gray-300 mb-3">
                Connect with other Pokémon enthusiasts and stay updated with the
                latest from PokéStrat by following us on social media.
              </p>
              <div className="flex justify-center lg:justify-end space-x-6">
                <a
                  href="https://discord.gg/hB4ZeaRgPX"
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Join our Discord"
                >
                  <FontAwesomeIcon icon={faDiscord} size="2x" />
                </a>
                <a
                  href="https://twitter.com/PokestratTB"
                  className="text-white hover:text-blue-400 transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCDGEIrizeB8jjRhHCiw_W0Q"
                  className="text-white hover:text-red-600 transition-colors"
                  aria-label="Watch our YouTube channel"
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="mt-6 border-t border-gray-600 pt-4 text-center text-xs">
            <p>
              Pokémon characters and names are copyright © The Pokémon Company
              and Nintendo.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
