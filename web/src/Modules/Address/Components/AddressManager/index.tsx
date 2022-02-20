import { useMyAddresss } from "../../Hooks/useMyAddresss";
import { Address } from "./Address";
interface AddressManagerProps {
  defaultValue?: IAddress;
}
export const AddressManager = ({ defaultValue }: AddressManagerProps) => {
  const { addresses } = useMyAddresss();
  return (
    <div className="form-group form-check">
      {addresses?.map((address, idx) => {
        const selected = address._id === defaultValue?._id;
        return <Address address={address} key={idx} selected={selected} />;
      })}
    </div>
  );
};
