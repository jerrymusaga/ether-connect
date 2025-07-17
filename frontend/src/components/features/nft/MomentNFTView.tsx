import React from "react";

interface MomentNFTViewProps {
  level: number;
  name: string;
  image: string;
}

const MomentNFTView: React.FC<MomentNFTViewProps> = ({
  level,
  name,
  image,
}) => {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="text-6xl mb-2">{image}</div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-sm text-gray-400 mb-2">Level {level}</p>
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 w-32 rounded-full mb-2" />
      <p className="text-xs text-gray-500">
        Evolves as you complete quests together!
      </p>
    </div>
  );
};

export default MomentNFTView;
