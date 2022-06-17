import Link from 'next/link'
import React, { useEffect } from 'react'
import { Icon } from 'web3uikit'
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Web3 from 'web3'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

const style = {
	wrapper: `bg-[white] z-50 border-b-4 fixed mb-20 overflow-x-hidden w-full justify-between w-screen px-[1.2rem] py-[0.8rem] flex `,
	logoContainer: `flex items-center cursor-pointer`,
	logoText: ` ml-[0.8rem] text-black font-bold text-3xl`,
	space: `md:flex md:flex-1 flex md:w-[28vw] flex-0 w-[100%] mr-[3px] mx-[0.8rem] w-max-[650px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
	headerItems: `md:flex w-full items-center justify-end`,
	headerItem: `text-black md:mt-[0px] mt-[10px] px-4 font-bold text-[#29303a] hover:text-[#c8cacd] cursor-pointer`,
	headerIcon: `text-black md:mt-[0px] mt-[10px] text-3xl font-bold md:px-4 px-2 hover:text-[#c8cacd] cursor-pointer`,
}

const NavBar = () => {
	//const [toggleMenu, setToggleMenu] = React.useState(false)
	//const [status, setStatus] = React.useState(null)
	//const [account, setCurrentAccount] = React.useState('')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [active, setActive] = React.useState('Home')
	const router = useRouter()

	useEffect(() => {
		checkActive(active, setActive, router)
	}, [router.pathname, active, router])

	const generateLink = (i) => {
		switch (i) {
			case 0:
				return '/'
			case 1:
				return '/news'
			case 2:
				return '/partner'
			case 3:
				return '/developer'
			case 4:
				return '/support-and-services'
			default:
				return '/'
		}
	}

	const NavBarItems = () => {
		return (
			<div className='flex'>
				{['Home', 'News', 'Partner', 'Developer', 'Support and services'].map(
					(item, i) => (
						<div
							key={i}
							onClick={() => {
								setActive(item)
							}}
							className={`text-[#939dae] md:mt-[0px] mt-[10px] px-4 font-semibold hover:text-[#c8cacd] cursor-pointer ${
								active === item
									? 'text-[black] font-bold border-b-4 border-[#459B71]'
									: ''
							} `}
						>
							<Link href={generateLink(i)}>{item}</Link>
						</div>
					)
				)}
			</div>
		)
	}

	const checkActive = (active, setActive, router) => {
		switch (router.pathname) {
			case '/':
				if (active !== 'Home') setActive('Home')
				break
			case '/developer':
				if (active !== 'Developer') setActive('Developer')
				break
			case '/news':
				if (active !== 'News') setActive('News')
				break
			case '/partner':
				if (active !== 'Partner') setActive('Partner')
				break
			case '/support-and-services':
				if (active !== 'Support and services') setActive('Support and services')
				break
			default:
				setActive('')
		}
	}

	//connent to metamask
	const ConnectToMetamask = async () => {
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum)
			try {
				// Request account access if needed
				await window.ethereum.enable()
				await window.ethereum.request({
					method: 'eth_requestAccounts',
				})
				// Acccounts now exposed
				//setCurrentAccount(accounts[0])
				onClose()
				return web3
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<div className={style.wrapper}>
			<Link href='/'>
				<div className={style.logoContainer}>
					{/*<Image src={Logo} height={40} width={40} />*/}
					<div className={style.logoText}>Greenchase</div>
				</div>
			</Link>
			<div className='hidden md:flex'>
				<div className={style.space} />
				<div className={style.headerItems}>
					<NavBarItems />
					<div className={style.headerIcon}>
						<Link href='/profile'>
							<CgProfile />
						</Link>
					</div>
					<div className={style.headerIcon} onClick={onOpen}>
						<MdOutlineAccountBalanceWallet />
					</div>
					<div className=''>
						<Drawer placement='right' onClose={onClose} isOpen={isOpen}>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerHeader borderBottomWidth='1px'>
									<div className='flex'>
										<div className='text-2xl font-bold mr-2 mt-1'>
											<MdOutlineAccountBalanceWallet />
										</div>
										<p>My walllet</p>
									</div>
								</DrawerHeader>
								<DrawerBody>
									<p className='mt-4 mb-2'>
										Connect with one of our available wallet providers or create
										a new one
									</p>
									<div
										onClick={ConnectToMetamask}
										className='flex cursor-pointer	'
									>
										<Icon fill='#000000' size={30} svg='metamask' />
										<p className='text-lg ml-2 mt-1 font-bold text-black mb-2'>
											MetaMask
										</p>
									</div>
								</DrawerBody>
							</DrawerContent>
						</Drawer>
					</div>
				</div>
			</div>
			<div className='flex md:hidden'>
				<div className={style.headerIcon}>
					<Link href='/profile'>
						<CgProfile />
					</Link>
				</div>
				<div className={style.headerIcon} onClick={onOpen}>
					<MdOutlineAccountBalanceWallet />
				</div>
				<div className=''>
					<Drawer placement='right' onClose={onClose} isOpen={isOpen}>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerHeader borderBottomWidth='1px'>
								<div className='flex'>
									<div className='text-2xl font-bold mr-2 mt-1'>
										<MdOutlineAccountBalanceWallet />
									</div>
									<p>My walllet</p>
								</div>
							</DrawerHeader>
							<DrawerBody>
								<p className='mt-4 mb-2'>
									Connect with one of our available wallet providers or create
									a new one
								</p>
								<div
									onClick={ConnectToMetamask}
									className='flex cursor-pointer	'
								>
									<Icon fill='#000000' size={30} svg='metamask' />
									<p className='text-lg ml-2 mt-1 font-bold text-black mb-2'>
										MetaMask
									</p>
								</div>
							</DrawerBody>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</div>
	)
}

export default NavBar
