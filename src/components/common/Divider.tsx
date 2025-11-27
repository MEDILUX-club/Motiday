type DividerProps = {
  inset?: boolean;
};

const Divider = ({ inset = false }: DividerProps) => (
  <hr className={inset ? 'divider divider-inset' : 'divider'} />
);

export default Divider;
