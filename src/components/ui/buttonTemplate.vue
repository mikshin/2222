<template>
    <button class="button" :type='type'>
        {{ text }}
    </button>
</template>
<script>
    export default {
        props: {
            type: null,
            text: null
        }
    }
</script>

<style lang="scss" scoped>
    .button {
        &.button-primary {
            background: #000;
            border: none;
            border-radius: 2px;
            padding: 12px 24px;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            text-transform: uppercase;
            color: #fff;
            transition: .3s background ease, .3s color ease;

            &:hover {
                cursor: pointer;
                background: #000000;
                box-shadow: 0px 4px 8px rgba(2, 40, 30, 0.25);
                color: #fff;
            }
        }

        &.button-secondary {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            text-transform: uppercase;
            background: transparent;
            border: none;
            padding: 12px 16px;
        }

        &[disabled="disabled"] {
            background: rgba(0, 0, 0, 0.3);
            &:hover {
                cursor: not-allowed;
                background: rgba(0, 0, 0, 0.3);
                box-shadow: none;
            }
        }
    }
</style>