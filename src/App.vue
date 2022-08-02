<script setup>
import Layout from '@/components/layout/index.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Toast from '@/components/general/toast.vue';
const store = useStore();
const isAuth = computed(() => store.getters.isAuthenticated);
const showToast = computed(() => store.getters.showToast);
</script>

<template>
	<div class="app-container flex items-center min-h-screen">
		<transition name="fade" mode="out-in">
			<Toast v-if="showToast" />
		</transition>

		<Layout v-if="isAuth" />
		<router-view v-else />
	</div>
</template>
