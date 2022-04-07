import { AppShell, Header, Navbar, Title } from "@mantine/core"

const Shell = ({ children }: { children: React.ReactNode}) => {
    return (
        <AppShell
            padding="md"
            header={<Header height={60} p="xs"><Title>Pesquisa GOV</Title></Header>}
            >
                {children}
            </AppShell>
    )
}

export default Shell;