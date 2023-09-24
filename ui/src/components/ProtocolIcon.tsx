import Image from 'next/image';
import { Protocol } from 'src/types';

const protocolMap: Record<Protocol, string> = {
  Haedal: '/img/protocols/haedal.png',
  NAVI: '/img/protocols/navi.png',
  Scallop: '/img/protocols/scallop.png',
  Sharbet: '/img/protocols/sharbet.png',
  Volo: '/img/protocols/volo.png',
}

export const ProtocolIcon: React.FC<{
  protocolName: Protocol,
  size: number
}> = (props) => {
  const iconUrl = protocolMap[props.protocolName];

  return (
    <Image
      src={iconUrl} alt={props.protocolName}
      width={props.size} height={props.size}
      layout="fixed"
      className='rounded-full'
    />
  );
}
