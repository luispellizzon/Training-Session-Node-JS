import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useLogout } from '@/hooks/login/useLogout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProfileImg from '@/assets/profile.jpg';

const Header = () => {
  const { mutateAsync } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    const promise = mutateAsync();
    toast.promise(promise, {
      loading: 'Logging out...',
      success: () => {
        navigate('/');
        return 'You are logged out!';
      },
      error: () => {
        return 'Error while logging out';
      },
    });
  };

  return (
    <header className="w-full items-center bg-white py-5 px-6 hidden sm:flex">
      <div className="w-1/2"></div>
      <div className="relative w-1/2 flex justify-end">
        <Menubar className="border-0 cursor-pointer">
          <MenubarMenu>
            <MenubarTrigger className="p-0 cursor-pointer relative z-10 w-16 h-16 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
              <img src={ProfileImg} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer" onClick={handleLogout}>
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
};

export default Header;
