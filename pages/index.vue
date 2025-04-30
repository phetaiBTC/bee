<template>
    <div>
        <div
            style="width: 700px; margin: 50px auto 0 auto;display: flex;flex-direction: column;justify-content: center;align-items: center;gap: 10px;">
            <div style="display: flex;flex-direction: column;width: 40%;gap: 10px;">
                <a-input v-model:value="data.username" placeholder="Username" />
                <a-input v-model:value="data.email" placeholder="Email" />
                <a-input v-model:value="data.password" placeholder="Password" />
                <a-button type="primary" @click="create">Add</a-button>
            </div>
            <table>
                <tr>
                    <th>email</th>
                    <th>username</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>option</th>
                </tr>
                <tr v-for="item, index in datas" :key="index">
                    <td>{{ item.email }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ dayjs(item.createdAt).format('HH:mm DD/MM/YYYY') }}</td>
                    <td>{{ dayjs(item.updatedAt).format('HH:mm DD/MM/YYYY') }}</td>
                    <td>
                        <a-button type="primary" @click="showModal(item.id)">Edit</a-button>
                        <a-button type="primary" danger ghost @click="showPromiseConfirm(item.id)">Delete</a-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <a-modal v-model:open="open" title="Title" @ok="update(idUpdate)" width="300px">
        <template #footer>
            <a-button key="back" @click="handleCancel">Return</a-button>
            <a-button key="submit" type="primary" @click="update(idUpdate)" :loading="loading">Submit</a-button>
        </template>
        <div style="display: flex;flex-direction: column;gap: 10px;margin: 0 10px;">
            <input type="text" placeholder="Email" v-model="datadate.email">
            <input type="text" placeholder="Username" v-model="datadate.username">
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/lo'

// ตั้ง locale เป็นลาว
dayjs.locale('lo')
import axios from 'axios'
import { notification } from 'ant-design-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const idUpdate = ref<number>(0)
const showModal = (id: number) => {
    idUpdate.value = id
    getone(id)
    open.value = true;
};
const handleCancel = () => {
    open.value = false;
};
const openNotificationWithIcon = (type: NotificationType, message: string) => {
    notification[type]({
        message: 'ແຈ້ງເຕືອນ',
        description: message,
    });
};
interface datas {
    id: number,
    email: string,
    password: string,
    username: string,
    createdAt: string,
    updatedAt: string
}
const data = ref({
    email: "",
    password: "",
    username: ""
})
const datadate = ref({
    email: "",
    password: "",
    username: ""
})
const datas = ref<datas[]>([])
const create = async () => {
    try {
        await axios.post('http://localhost:4000/users', data.value).then((res) => {
            openNotificationWithIcon("success", res.data.message)
        })
        data.value = {
            email: "",
            password: "",
            username: ""
        }
        getdata()
    } catch (err: any) {
        console.error('Error:', err.response.data.message)
        openNotificationWithIcon('error', err.response.data.message)
    }
}
const update = async (id: number) => {
    try {
        await axios.patch(`http://localhost:4000/users/${id}`, datadate.value).then((res) => {
            openNotificationWithIcon("success", res.data.message)
        })
        data.value = {
            email: "",
            password: "",
            username: ""
        }
        getdata()
    } catch (err) {
        console.error('Error:', err)
    }
}
const getdata = async () => {
    try {
        await axios.get('http://localhost:4000/users').then((res) => {
            datas.value = res.data
        })
    } catch (err) {
        console.error('Error:', err)
    }
}
const getone = async (id: number) => {
    try {
        await axios.get(`http://localhost:4000/users/${id}`).then((res) => {
            datadate.value = res.data
        })
    } catch (err) {

    }
}
function showPromiseConfirm(id: number) {
    Modal.confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        async onOk() {
            await detele(id)
        },
        onCancel() { },
    });
}
const detele = async (id: number) => {
    try {
        await axios.delete(`http://localhost:4000/users/${id}`).then((res) => {
            openNotificationWithIcon("success", res.data.message)
        })
        getdata()
    } catch (err) {
        console.error('Error:', err)
    }
}
onMounted(async () => {
    getdata()
})
</script>
<style scoped lang="css">
table,
th,
td {
    border: 1px solid black;
}

td {
    padding: 10px
}
</style>