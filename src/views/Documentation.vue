<template>
    <div>
        <ErrorMessage title="Documentation" message="Documentation can be found on the Github!"/>
    </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage'

export default {
   name: 'Dashboard',
   components: {
       ErrorMessage
   }
}
</script>