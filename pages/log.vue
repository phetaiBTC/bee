<template>
    <div>
        <!-- <div class="flex gap-3 mb-4">
            <a-date-picker v-model:value="date" :format="'DD/MM/YYYY'" />
            <a-tooltip title="search">
                <a-button type="primary" shape="circle" @click="fetchData" :icon="h(SearchOutlined)" />
            </a-tooltip>

            {{ date }}
        </div> -->
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'date'">
                    <a>{{ record.message.date }}</a>
                </template>
                <template v-if="column.dataIndex === 'ip'">
                    <a>{{ record.message.ip }}</a>
                </template>
                <template v-if="column.dataIndex === 'method'">
                    <a>{{ record.message.method }}</a>
                </template>
                <template v-if="column.dataIndex === 'body'">
                    <a>{{ JSON.stringify(record.message.body) }}</a>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp()
const date = ref("")
const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
    },
    {
        title: 'Method',
        dataIndex: 'method',
        key: 'method',
    },
    {
        title: 'Body',
        dataIndex: 'body',
        key: 'body',
    },
];
interface Data {
    message: {
        date: string,
        ip: string,
        method: string,
        body: object
    }
}
const data = ref<Data[]>([])

const fetchData = async () => {
    await $axios.get('/logs?date=' + date.value).then((res) => {
        data.value = res.data
    })
}

onMounted(async () => {
    await fetchData()
})
</script>
