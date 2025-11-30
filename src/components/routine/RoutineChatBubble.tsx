import { useState } from 'react';
import iconClap from '../../assets/icons/ic_clap.svg';

type RoutineChatBubbleProps = {
  userProfile: string;
  userName: string;
  contentImage?: string;
  contentText?: string;
  timestamp: string;
  initialClapCount: number;
};

const RoutineChatBubble = ({
  userProfile,
  userName,
  contentImage,
  contentText,
  timestamp,
  initialClapCount,
}: RoutineChatBubbleProps) => {
  const [clapCount, setClapCount] = useState(initialClapCount);

  return (
    <div className="flex items-start gap-3">
      <img src={userProfile} alt={userName} className="h-10 w-10 rounded-full object-cover" />

      <div className="flex-1 space-y-2">
        <div className="text-sm font-semibold text-gray-900">{userName}</div>

        <div className="flex items-end gap-2">
          <div className="rounded-2xl rounded-tl-none bg-white border border-gray-100 shadow-sm p-3 max-w-[280px]">
            <div className="space-y-2">
              {contentImage && (
                <img
                  src={contentImage}
                  alt="content"
                  className="w-full rounded-xl object-cover"
                />
              )}
              {contentText && (
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {contentText}
                </div>
              )}
            </div>
          </div>

          <span className="text-xs text-gray-400">{timestamp}</span>
        </div>

        <button
          type="button"
          onClick={() => setClapCount((prev) => prev + 1)}
          className="inline-flex items-center gap-1 text-sm text-amber-600"
        >
          <img src={iconClap} alt="clap" className="h-4 w-4" />
          <span>{clapCount}</span>
        </button>
      </div>
    </div>
  );
};

export default RoutineChatBubble;
