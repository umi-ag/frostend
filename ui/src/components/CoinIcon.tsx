import Image from 'next/image';
import { CoinProfile } from 'src/app/libs/coinList';


export const CoinIcon: React.FC<{
  coin: CoinProfile
  size: number
}> = (props) => {
  // const size = props.size ?? 50;
  return (
    <Image
      src={props.coin.iconUrl ?? ""} alt={props.coin.name}
      width={props.size} height={props.size}
      layout="fixed"
      className='rounded-full'
    />
  );
}
