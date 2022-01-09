<template>
    <div>
        <v-alert color="blue" text type="info">
            <div>
                <Chip color="red" text="RED" /> arguments are required<br/>
                <Chip color="green" text="GREEN" /> arguments are optional
            </div>
        </v-alert>
        <v-expansion-panels popout>
            <v-expansion-panel v-for="command in commands" :key="command.name">
                <v-expansion-panel-header>
                    <div>
                        <span class="mr-1">/{{ command.name }}</span>
                        <Chip tooltip v-for="(option, index) in command.options" :text="option.name.toUpperCase()" :color="option.required ? 'red' : 'green'" :key="index">
                            <div><strong>Type: {{ option.type }}<br/>{{ option.description }}</strong></div>
                        </Chip>

                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-expansion-panels v-if="command.sub_commands" class="my-2">
                        <v-expansion-panel class="indigo darken-4" v-for="sub_command in command.sub_commands" :key="sub_command.name">
                            <v-expansion-panel-header>
                                <div>
                                    <span class="mr-1">/{{ command.name }} {{ sub_command.name }}</span>
                                    <Chip tooltip v-for="(option, index) in command.options" :text="option.name.toUpperCase()" :color="option.required ? 'red' : 'green'" :key="index">
                                        <div><strong>Type: {{ option.type }}<br/>{{ option.description }}</strong></div>
                                    </Chip>
                                </div>                                
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-alert v-if="Object.keys(sub_command.options).length > 0" text color="info">
                                    <span v-for="(option, index) in sub_command.options" :key="index">
                                        <span class="indigo--text mr-1">{{ option.name.toUpperCase() }}:</span>
                                        <span> {{ option.description }} </span>
                                        <br/>
                                    </span>
                                </v-alert>
                                <div class="text-body-2 grey--text">
                                    {{ sub_command.description }}
                                </div>   
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-alert v-if="Object.keys(command.options).length > 0" text color="info">
                        <span v-for="(option, index) in command.options" :key="index">
                            <span class="indigo--text mr-1">{{ option.name.toUpperCase() }}:</span>
                            <span> {{ option.description }} </span>
                            <br/>
                        </span>
                    </v-alert>
                    <div class="text-body-2 grey--text">
                        {{ command.description }}
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import { fetchCommands } from '@/api/api.js'
import Chip from '@/components/Chip'
export default {
    name: 'Commands',
    components: { Chip },
    async created() {
        this.commands = await fetchCommands()
    },
    data() {
        return {
            commands: null
        }
    }
}
</script>