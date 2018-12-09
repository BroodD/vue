<template>
    <Page class="page">
        <ActionBar title="Calculator" class="action-bar" />
        <ScrollView>
            <GridLayout columns="*, *, *, *" rows="auto, auto, auto, auto, auto, auto"
                class="calc" backgroundColor="lightgray">
                <Label :text="res" row="0" col="0" colSpan="4" class="display" />
                <Button text="+" row="1" col="0" class="operator" @tap="click('+')" />
                <Button text="-" row="1" col="1" class="operator" @tap="click('-')" />
                <Button text="*" row="1" col="2" class="operator" @tap="click('*')" />
                <Button text="/" row="1" col="3" class="operator" @tap="click('/')" />
                <Button text="7" row="2" col="0" @tap="click('7')" />
                <Button text="8" row="2" col="1" @tap="click('8')" />
                <Button text="9" row="2" col="2" @tap="click('9')" />
                <Button text="4" row="3" col="0" @tap="click('4')" />
                <Button text="5" row="3" col="1" @tap="click('5')" />
                <Button text="6" row="3" col="2" @tap="click('6')" />
                <Button text="1" row="4" col="0" @tap="click('1')" />
                <Button text="2" row="4" col="1" @tap="click('2')" />
                <Button text="3" row="4" col="2" @tap="click('3')" />
                <Button text="0" row="5" col="0" @tap="click('0')" />
                <Button text="." row="5" col="1" @tap="click('.')" />
                <Button text="C" row="5" col="2" @tap="clear" />
                <Button text="=" row="2" col="3" rowSpan="4" class="operator equal" @tap="clear"/>
            </GridLayout>
        </ScrollView>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                res: "43"
            };
        },
        methods: {
            click(v) {
                this.res += v;
            },
            clear() {
                this.res = ''
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .action-bar {
        background-color: #007DFE;
        color: white;
    }

    .calc {
        align-items: center;
    }

    .calc .display {
        background-color: #fff;
        color: #000;
        padding: 30 15;
        font-size: 32;
        text-align: right;
    }

    .calc Button {
        font-size: 22;
        padding: 20 0;
        margin: 0;
        background-color: #fff;
        color: #000;
        text-align: center;
        border-width: 1;
        border-color: grey;
    }

    .calc .operator {
        background-color: #DBDBDB;
        color: #000;
        font-size: 26;
    }

    .calc .equal {
        background-color: #007DFE;
        color: white;
    }
</style>