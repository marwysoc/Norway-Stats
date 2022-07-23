export interface DrawerProps {
    isOpen: boolean;
    handleToggle: () => void;
}

export interface MenuLinkProps {
    linkTo: string;
    linkTxt: string;
}

export interface MenuProps {
    isMobile: boolean;
}