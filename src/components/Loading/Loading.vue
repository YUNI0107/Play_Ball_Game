<template>
    <div class="loading">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
    </div>
</template>

<script>
export default {
    mounted(){
        let circles = document.querySelectorAll('.circle');
        circles.forEach((item,index)=>{
            item.style.animationDelay = index * 0.1 + "s";
        })
    }
}
</script>

<style scoped>
    .circle{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #ffffff;
        border-radius: 50%;
        margin: 0 10px;
        animation: bigSmall .5s infinite ease-in-out alternate;
    }

    @keyframes bigSmall{
        from{
            transform: scale(1);
            opacity: 0.9;
        }
        to{
            transform: scale(0.1);
            opacity: 0.1;
        }
    }

</style>