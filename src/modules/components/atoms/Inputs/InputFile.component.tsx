import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, InputProps, useModal } from "@nextui-org/react";
import Image from "next/image";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "../Modal.component";
import { useOnActive } from "~/lib/hooks";

export type ImageDataType = {
  base64: string;
  name: string;
  type: string;
};

interface InputFileProps extends InputProps {
  thumbnailClassName?: string;
  EmptyText?: string;
  imageWidth?: number;
  imageHeight?: number;
  onImageChange?: (data: ImageDataType) => void;
  onFileChange?: (file: Buffer) => void;
}

const InputFile = (props: InputFileProps) => {
  const [imageData, setImageData] = useState<ImageDataType>();
  const { isActive, onActive, onDisabled } = useOnActive();
  const [file, setFile] = useState<Buffer>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]!;

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageBase64 = event.target?.result;
        const buffer = Buffer.from(event.target?.result as string);

        setFile(buffer);

        setImageData({
          base64: imageBase64! as string,
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // if (!ImageData) return;
    if (!file) return;
    // props.onImageChange && props.onImageChange(imageData!);
    props.onFileChange && props.onFileChange(file);
  }, [file]);

  return (
    <div className="flex flex-col items-start">
      {props.label && (
        <label className="mb-1 flex gap-[2px] text-foreground-500">
          {props.label}{" "}
          {props.isRequired && <span className="text-xs text-danger">*</span>}
        </label>
      )}
      <label
        htmlFor="dropzone-file"
        className={clsx(props.className, {
          "flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-default-100 hover:border-default-300 hover:bg-default-200 dark:border-white/10":
            Boolean(imageData?.base64) === false,
          fef: Boolean(imageData?.base64) === true,
          [`!w-[${props.imageWidth}px]`]: Boolean(props.imageWidth),
          [`!h-[${props.imageHeight}px]`]: Boolean(props.imageHeight),
        })}
      >
        {imageData?.base64 && (
          <Image
            src={imageData.base64 as string}
            alt="Thumbnail"
            className={clsx(
              "h-full w-full cursor-pointer rounded-full border object-cover shadow-xl transition-all hover:scale-105 dark:border-white/10 ",
              props.thumbnailClassName,
            )}
            width={props.imageWidth}
            height={props.imageHeight}
          />
        )}
        {!Boolean(imageData?.base64) && (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Icon icon="tabler:cloud-upload" width={32} />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {props.EmptyText ?? "Haz click aqui"}
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => handleChange(e)}
        />
      </label>
      {imageData?.base64 && (
        <div className="mt-4 flex w-full justify-start gap-4">
          <Button
            size="sm"
            variant="flat"
            type="button"
            className="flex items-center gap-1"
            onClick={onActive}
          >
            <Icon
              icon="mdi:eye-outline"
              width={18}
              className="dark:text-slate-300"
            />
            Ver
          </Button>
          <Button
            size="sm"
            variant="flat"
            type="button"
            className="flex items-center gap-1"
          >
            <Icon
              icon="uil:image-edit"
              width={18}
              className="dark:text-slate-300"
            />
            Editar
          </Button>
        </div>
      )}

      {imageData?.base64 && (
        <Modal
          title=""
          isOpen={isActive}
          onClose={onDisabled}
          backdrop="opaque"
          size="lg"
        >
          <Image
            src={imageData?.base64 ?? ""}
            width={200}
            height={180}
            className="mb-4 w-full rounded-xl"
            alt="entity image"
          />
        </Modal>
      )}
    </div>
  );
};

export default InputFile;
