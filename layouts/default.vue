<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo">

            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <template v-for="item in menuItems" :key="item.key">
                    <a-menu-item v-if="!item.children" :key="item.key">
                        <component :is="item.icon" />
                        <span>
                            <nuxt-link v-if="item.link" :to="item.link">{{ item.label }}</nuxt-link>
                            <span v-else>{{ item.label }}</span>
                        </span>
                    </a-menu-item>

                    <a-sub-menu v-else>
                        <template #title>
                            <span>
                                <component :is="item.icon" />
                                <span>{{ item.label }}</span>
                            </span>
                        </template>
                        <a-menu-item v-for="child in item.children" :key="child.key">
                            {{ child.label }}
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <nuxt-page />
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const menuItems = [
    { key: '1', label: 'Home', icon: PieChartOutlined,link: '/' },
    { key: '2', label: 'Option 2', icon: DesktopOutlined },
    {
        key: 'sub1',
        label: 'User',
        icon: UserOutlined,
        children: [
            { key: '3', label: 'Tom' },
            { key: '4', label: 'Bill' },
            { key: '5', label: 'Alex' },
        ]
    },
    {
        key: 'sub2',
        label: 'Team',
        icon: TeamOutlined,
        children: [
            { key: '6', label: 'Team 1' },
            { key: '8', label: 'Team 2' },
        ]
    },
    { key: '9', label: 'Log', icon: FileOutlined, link: '/log' }
]
</script>
<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>