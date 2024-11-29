import { useMintForm } from "../hooks/useMintForm";
import { MintForm } from "../components/MintForm";

export const Mint: React.FC = () => {
	const [state, actions] = useMintForm();
	return <MintForm {...state} {...actions} />;
}