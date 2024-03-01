import Image from 'next/image';

const Loading = () => {
  return (
    <div className="relative">
      <Image
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
        src="/images/loading.gif"
        alt="Profile Image"
        objectFit="cover"
        width={250}
        height={250}
      />
    </div>
  );
};

export default Loading;
