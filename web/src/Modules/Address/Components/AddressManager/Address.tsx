import { useMyAddresss } from "../../Hooks/useMyAddresss";
interface AddressProps {
  address: IAddress;
  selected?: boolean;
}
export const Address = ({ address, selected }: AddressProps) => {
  return (
    <>
      <input
        type="checkbox"
        className="form-check-input"
        id="exampleCheck1"
        checked={selected}
      />
      <label className="form-check-label" htmlFor="exampleCheck1">
        {address.name}
      </label>
    </>
  );
};
