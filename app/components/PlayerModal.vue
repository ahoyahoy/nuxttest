<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Přidat nového hráče</DialogTitle>
        <DialogDescription>
          Vyplňte údaje o novém hráči
        </DialogDescription>
      </DialogHeader>

      <!-- Alert pro zobrazení chybových zpráv -->
      <Alert
        v-if="serverErrorMessage"
        variant="destructive"
        class="mb-4"
      >
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>Chyba při odesílání</AlertTitle>
        <AlertDescription>
          {{ serverErrorMessage }}
        </AlertDescription>
      </Alert>

      <form
        class="space-y-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="firstName"
        >
          <FormItem>
            <FormLabel>Křestní jméno</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Zadejte křestní jméno"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="lastName"
        >
          <FormItem>
            <FormLabel>Příjmení</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Zadejte příjmení"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="phone"
        >
          <FormItem>
            <FormLabel>Telefon</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+421905123456"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Zadejte email"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="ic"
        >
          <FormItem>
            <FormLabel>IČ</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="12345678"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            :disabled="mutation.isPending.value"
            @click="closeModal"
          >
            Zrušit
          </Button>
          <Button
            type="submit"
            :disabled="mutation.isPending.value"
          >
            <span
              v-if="mutation.isPending.value"
              class="mr-2"
            >
              <svg
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            {{ mutation.isPending.value ? 'Přidávám...' : 'Přidat hráče' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import {AlertCircle} from 'lucide-vue-next'
import {useForm} from 'vee-validate'
import {ref} from 'vue'
import {toast} from 'vue-sonner'
import * as z from 'zod'

import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {usePlayerCreateMutation} from '@/data/hooks/players'

const isOpen = ref(false)
const serverErrorMessage = ref('')

// Definice validačního schématu
const formSchema = toTypedSchema(z.object({
  firstName: z.string().min(1, 'Křestní jméno je povinné'),
  lastName: z.string().min(1, 'Příjmení je povinné'),
  phone: z.string()
    .min(1, 'Telefon je povinný')
    .regex(/^\+\d{1,3}\d{9,15}$/, 'Telefon musí být v mezinárodním formátu, např. +421905123456'),
  email: z.string().email('Neplatný email').min(1, 'Email je povinný'),
  ic: z.string()
    .min(1, 'IČ je povinné'),
  // .regex(/^\d{8}$/, 'IČ musí být 8-místné číslo'),
}))

const form = useForm({
  validationSchema: formSchema,
})

// Mutation pro vytvoření hráče
const mutation = usePlayerCreateMutation()

const onSubmit = form.handleSubmit(async (values) => {
  // Reset server error message při novém pokusu
  serverErrorMessage.value = ''

  try {
    await mutation.mutateAsync(values)

    toast.success('Hráč byl úspěšně přidán')

    // Resetování formuláře a zavření modalu
    form.resetForm()
    closeModal()
  }
  catch (err) {
    console.error('Error creating player:', err)

    // Debug: Zobrazení celé chyby
    console.log('Full error object:', JSON.stringify(err, null, 2))

    // Pokus o parsování validačních chyb z API response
    let errorData = null

    // Různé možné struktury chyby
    if (err && typeof err === 'object') {
      errorData = err.response?.data || err.data || err
    }

    console.log('Error data:', errorData)

    if (errorData?.details) {
      try {
        const violations = errorData.details[0]?.debug?.violations || []
        console.log('Violations found:', violations)

        violations.forEach((violation) => {
          const fieldName = violation.fieldPath
          const message = violation.message

          console.log(`Setting field error: ${fieldName} = ${message}`)

          if (fieldName && message) {
            form.setFieldError(fieldName, message)
          }
        })

        // Nastavení server error message
        serverErrorMessage.value = errorData.message || 'Formulář obsahuje chyby. Zkontrolujte zadané údaje.'
      }
      catch (parseError) {
        console.error('Error parsing validation errors:', parseError)
        serverErrorMessage.value = 'Nepodařilo se přidat hráče - neplatné údaje'
      }
    }
    else if (errorData?.message) {
      // Zobrazení obecné chyby z message
      serverErrorMessage.value = errorData.message
    }
    else {
      // Fallback - zobrazíme obecnou chybu
      serverErrorMessage.value = 'Nepodařilo se přidat hráče'
    }
  }
})

const closeModal = () => {
  isOpen.value = false
  serverErrorMessage.value = ''
  form.resetForm()
}

// Expose prop pro otevření modalu z nadřazené komponenty
defineExpose({
  open: () => isOpen.value = true,
  close: closeModal,
})
</script>
