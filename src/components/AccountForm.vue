<template>
  <div class="container">
    <h2>Учетные записи
    <el-button  @click="store.addAccount">+</el-button>
    </h2>
    <br/>
    <!-- Сообщение с информацией -->
    <el-alert type="info" :closable="false" class="info-alert">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </el-alert>

    <!-- Заголовки столбцов -->
    <div class="table-header">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <span></span>
    </div>

    <div v-for="account in store.accounts" :key="account.id" class="account">
      <!-- Поле меток -->
      <el-input
        v-model="account.labelsStr"
        placeholder="Введите метки"
        maxlength="50"
        @blur="store.formatLabels(account)"
        :class="{ error: account.labelsError }"
      />

      <!-- Выбор типа записи -->
      <el-select v-model="account.type" @change="store.validateAccount(account)">
        <el-option value="Локальная" label="Локальная" />
        <el-option value="LDAP" label="LDAP" />
      </el-select>

      <!-- Логин (растягивается, если LDAP) -->
      <el-input
        v-model="account.login"
        placeholder="логин"
        maxlength="100"
        @blur="store.validateAccount(account)"
        :class="{ error: account.loginError }"
        :style="{ gridColumn: account.type === 'LDAP' ? 'span 2' : 'auto' }"
      />

      <!-- Пароль (скрывается при LDAP) -->
      <el-input
        v-if="account.type === 'Локальная'"
        v-model="account.password"
        :type="account.showPassword ? 'text' : 'password'"
        placeholder="пароль"
        maxlength="100"
        @blur="store.validateAccount(account)"
        :class="{ error: account.passwordError }"
      >
        <template #suffix>
          <el-icon @click="togglePasswordVisibility(account)" class="eye-icon">
            <component :is="account.showPassword ? View : Hide" />
          </el-icon>
        </template>
      </el-input>

      <el-button type="danger" @click="store.deleteAccount(account.id)" class="delete-btn" circle>
        <el-icon><delete /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';
import { ElButton, ElSelect, ElOption, ElInput, ElAlert, ElIcon } from 'element-plus';
import { Delete, View, Hide } from '@element-plus/icons-vue';

const store = useAccountsStore();

const togglePasswordVisibility = (account: any) => {
  account.showPassword = !account.showPassword;
};

store.accounts.forEach(account => {
  if (account.showPassword === undefined) {
    account.showPassword = false;
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

/* Сообщение-info отступает от заголовков */
.info-alert {
  margin-bottom: 20px;
}

/* Заголовки столбцов */
.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr auto;
  font-weight: bold;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
}

/* Контейнер для каждой учетной записи */
.account {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr auto;
  gap: 10px;
  margin: 15px 0;
  align-items: center;
}

/* Ошибки */
.error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

/* Иконка глаза */
.eye-icon {
  cursor: pointer;
  font-size: 18px;
}

/* Кнопка удаления всегда остается на месте */
.delete-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
