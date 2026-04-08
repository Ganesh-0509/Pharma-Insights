'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator as Separator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Lightbulb,
  Settings,
  HelpCircle,
  TestTube,
  FileText,
  BookOpen,
  FilePieChart,
  LogOut,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuth, useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { initiateSignOut } from '@/firebase/non-blocking-login';
import { collection, query, orderBy, limit } from 'firebase/firestore';

const menuItems = [
    { href: '/dashboard', label: 'AI Insights', icon: Lightbulb },
    { href: '/dashboard/clinical-trials', label: 'Clinical Trials', icon: TestTube },
    { href: '/dashboard/patents', label: 'Patents', icon: FileText },
    { href: '/dashboard/web-intelligence', label: 'Web Intelligence', icon: BookOpen },
    { href: '/dashboard/reports', label: 'Reports', icon: FilePieChart },
]

function SearchHistory() {
    const { user } = useUser();
    const firestore = useFirestore();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get('q');

    const moleculeHistoryQuery = useMemoFirebase(() => {
      if (!user || !firestore) return null;
      return query(
        collection(firestore, 'users', user.uid, 'moleculeQueries'),
        orderBy('timestamp', 'desc'),
        limit(20) // Fetch more to allow for deduplication
      );
    }, [user, firestore]);

    const diseaseHistoryQuery = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return query(
          collection(firestore, 'users', user.uid, 'diseaseQueries'),
          orderBy('timestamp', 'desc'),
          limit(20) // Fetch more to allow for deduplication
        );
      }, [user, firestore]);

    const { data: moleculeHistory } = useCollection<{queryText: string}>(moleculeHistoryQuery);
    const { data: diseaseHistory } = useCollection<{queryText: string}>(diseaseHistoryQuery);

    const combinedHistory = [
        ...(moleculeHistory || []).map(h => ({...h, isDisease: false})),
        ...(diseaseHistory || []).map(h => ({...h, isDisease: true})),
    ].sort((a,b) => b.id.localeCompare(a.id));

    const uniqueHistory = Array.from(new Map(combinedHistory.map(item => [item.queryText, item])).values()).slice(0, 7);

    if (!user || uniqueHistory.length === 0) {
        return null;
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
                <History />
                <span>Recent Searches</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {uniqueHistory.map(item => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton 
                                size="sm" 
                                className="truncate" 
                                asChild
                                isActive={item.queryText === currentQuery}
                            >
                               <Link href={`/dashboard?q=${encodeURIComponent(item.queryText)}`}>{item.queryText}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}


export function AppSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const auth = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
      initiateSignOut(auth);
      router.push('/');
    }

    const q = searchParams.get('q');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Button variant="ghost" className="h-10 w-full justify-start px-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center" asChild>
          <Link href="/">
            <Logo className="h-6 w-6 text-primary" />
            <span className="group-data-[collapsible=icon]:hidden font-bold ml-2">Pharma Explorer</span>
          </Link>
        </Button>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                        <Link href={item.href + (q ? `?q=${q}`: '')}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <SearchHistory />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Help">
                    <HelpCircle />
                    <span>Help</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} tooltip="Log out">
                    <LogOut />
                    <span>Log out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
