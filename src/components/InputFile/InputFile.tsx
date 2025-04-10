import { useRef } from 'react';
import { toast } from 'react-toastify';
import config from 'src/constants/config';
interface Props {
  onChange?: (file?: File) => void;
}
const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && (fileFromLocal.size > config.maxFileSize || !fileFromLocal.type.includes('image'))) {
      toast.error('File không hợp lệ!');
      return;
    }
    onChange && onChange(fileFromLocal);
  };
  return (
    <>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          (event.target as any).value = null;
        }}
      />
      <button
        className='mt-5 flex h-10 items-center justify-center rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </>
  );
};

export default InputFile;
