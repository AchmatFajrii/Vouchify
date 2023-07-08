const Button = (props) => {
  const { children, bgColor } = props;
  return (
    <>
      <button className={`block flex-1 p-2 md:rounded-bl-lg ${bgColor}`}>
        {children}
      </button>
    </>
  );
};
export default Button;
