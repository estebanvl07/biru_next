import Image from "next/image";
import Link from "next/link";
import { Button } from "~/modules/components";

export const Explore = () => {
  return (
    <section className="mx-auto mt-16 flex w-full flex-col-reverse items-center justify-around gap-8 px-4 md:mb-28 md:max-w-[72rem] md:px-8 lg:mt-44 lg:flex-row lg:gap-0">
      <aside className="">
        <span className="absolute hidden h-[20rem] w-[20rem] rounded-full bg-primary shadow-2xl shadow-primary dark:shadow-black md:block"></span>
        <Image
          src="/dashboard_two_views.webp"
          alt="Dashboard views"
          className="w-full drop-shadow-2xl md:max-w-[35rem]"
          loading="lazy"
          width={550}
          height={550}
        />
      </aside>
      <section className="">
        <p className="mb-4 text-center font-encode font-bold text-primary lg:text-start">
          Explora la facilidad de su uso
        </p>
        <h2 className="text-center font-encode text-3xl font-bold !leading-none tracking-tight md:text-4xl lg:text-start">
          Maneja con {""}
          <span className="font-encode text-primary dark:text-indigo-400">
            Biru
          </span>
          <br />
          tu negocio de forma <br />
          fácil y sencilla
        </h2>
        <p className="mt-4  max-w-[26rem] text-center lg:text-start">
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quam
          perspiciatis cum recusandae repellat quidem. */}
        </p>
        <Link href="/register" aria-label="Inicia aquí">
          <Button className="mt-8 w-full lg:w-fit">
            <span className="whitespace-nowrap">Iniciar ahora</span>
          </Button>
        </Link>
      </section>
    </section>
  );
};
