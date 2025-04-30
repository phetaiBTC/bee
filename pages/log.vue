<template>
    <div>
        <div class="flex gap-3 mb-4">
            <a-date-picker v-model:value="date" :format="'DD/MM/YYYY'" />
            <a-tooltip title="search">
                <a-button type="primary" shape="circle" @click="fetchData" :icon="h(SearchOutlined)" />
            </a-tooltip>

            {{ date }}
        </div>
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { Dayjs } from 'dayjs';
const { $axios } = useNuxtApp()
const date = ref("")
const columns = [
    {
        title: 'Log',
        dataIndex: 'message',
        key: 'name',
    },
];
interface Data {
    message: string
}
const data = ref<Data[]>([])
const fetchData = async () => {
    await $axios.get('/logs?date=' + date.value).then((res) => {
        data.value = res.data
    })
}
onMounted(async () => {
    await fetchData()
    // const token = await $getToken();
    // console.log('🔑 FCM Token:', token);
})
</script>