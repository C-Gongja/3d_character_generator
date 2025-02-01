import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useUserStore } from '../../state-management/user-store';
import { useNavigate } from 'react-router-dom';

const navigation = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'Profile', href: '/profile', current: true }
]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	const { user, clearUser } = useUserStore();
	const navigate = useNavigate();

	const handleSignOut = () => {
		clearUser();
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<Disclosure as="nav" className="fixed top-0 w-full z-50 bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center">
							<img
								alt="Your Company"
								src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
								className="h-8 w-auto"
							/>
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={classNames(
											item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'rounded-md px-3 py-2 text-sm font-medium',
										)}
									>
										{item.name}
									</a>
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{user ? (
							// if user logged in
							<Menu as="div" className="relative">
								<div>
									<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<img
											alt={user.name}
											src="/default-profile.png" // 프로필 이미지 경로 (실제 이미지 적용 가능)
											className="h-8 w-8 rounded-full"
										/>
									</MenuButton>
								</div>
								<MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
									<MenuItem>
										{({ active }) => (
											<a
												href="/settings"
												className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
											>
												Settings
											</a>
										)}
									</MenuItem>
									<MenuItem>
										{({ active }) => (
											<button
												onClick={handleSignOut}
												className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
											>
												Sign out
											</button>
										)}
									</MenuItem>
								</MenuItems>
							</Menu>
						) : (
							// user not logged in
							<button
								onClick={() => navigate('/login')}
								className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
							>
								Sign In
							</button>
						)}
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							aria-current={item.current ? 'page' : undefined}
							className={classNames(
								item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
								'block rounded-md px-3 py-2 text-base font-medium',
							)}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	)
}
