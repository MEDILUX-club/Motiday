import { useState } from 'react';
import BottomNavigationBar from '../../components/common/BottomNavigationBar';
import InputField from '../../components/common/InputField';
import iconMenu from '../../assets/icons/ic_menu.svg';
import iconCart from '../../assets/icons/ic_cart.svg';
import iconBell from '../../assets/icons/ic_bell.svg';
import sampleImage from '../../assets/images/img_HomeFeedCard.png';

type Product = {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  badge?: string;
  image: string;
};

const sampleProducts: Product[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `product-${idx}`,
  title: '아나로민 플러스, 2박스, 20개입',
  price: '59,900원',
  originalPrice: '150,000원',
  discount: '63%',
  badge: '칼슘 고함량 운동인의 선택',
  image: sampleImage,
}));

const categories = ['전체보기', '공부루틴', '독서루틴', '운동루틴'];

const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState('전체보기');

  return (
    <div className="flex min-h-dvh w-full justify-center bg-gray-100">
      <div className="relative flex w-full max-w-[430px] flex-col min-h-dvh bg-white pb-[env(safe-area-inset-bottom)]">
        <header className="flex items-center justify-between px-4 py-3">
          <button>
            <img src={iconMenu} alt="menu" className="h-6 w-6 object-contain" />
          </button>
          <div className="flex items-center gap-4">
            <button>
              <img src={iconCart} alt="cart" className="h-6 w-6 object-contain" />
            </button>
            <button>
              <img src={iconBell} alt="alarm" className="h-6 w-6 object-contain" />
            </button>
          </div>
        </header>

        <div className="px-4 pb-20 space-y-4">
          <InputField placeholder="Search" variant="white" showSearchIcon className="bg-gray-100" />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                  activeCategory === cat
                    ? 'bg-primary-800 text-white border-primary-800'
                    : 'bg-white text-gray-800 border-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="divide-y divide-gray-100">
            {sampleProducts.map((product) => (
              <div key={product.id} className="flex gap-3 py-4">
                <div className="h-28 w-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  {product.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <div className="text-base font-semibold text-gray-900 line-clamp-2">{product.title}</div>
                  <div className="flex items-baseline gap-2 text-sm">
                    {product.originalPrice && (
                      <span className="line-through text-gray-400">{product.originalPrice}</span>
                    )}
                    {product.discount && <span className="text-red-500 font-semibold">{product.discount}</span>}
                  </div>
                  <div className="text-lg font-bold text-gray-900">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <BottomNavigationBar />
        </div>
      </div>
    </div>
  );
};

export default StorePage;
