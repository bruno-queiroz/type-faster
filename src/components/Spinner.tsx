const Spinner = ({ color = "neutral-900" }) => {
  return (
    <div
      className={`w-[24px] h-[24px] border-[5px] border-${color} mx-auto border-t-[5px] border-t-transparent rounded-full animate-spin`}
    />
  );
};

export default Spinner;
