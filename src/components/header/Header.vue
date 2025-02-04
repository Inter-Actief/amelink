<template>
	<header id="header" :class="[isDesktop ? '' : 'mobile']">
		<div class="ia_section">
			<div class="ia_row">
				<div id="header_logo" class="ia_column">
					<Logo />
				</div>

				<div id="header_info" class="ia_column">
					<SearchToggle v-if="isDesktop" />

					<EpaButton v-if="isTablet || isDesktop"
						href="https://www.inter-actief.utwente.nl/oidc/authenticate/" target="_blank"
						:class="['white', isTablet ? 'small' : '']">
						{{ $gettext('Become a member') }}
					</EpaButton>

					<EpaButton v-if="isTablet || isDesktop"
						href="https://www.inter-actief.utwente.nl/oidc/authenticate/" target="_blank"
						:class="['white', isTablet ? 'small' : '']">
						{{ $gettext('Sign-in') }}
					</EpaButton>

					<button class="mobilemenubutton" v-if="!isDesktop" @click="toggleMobileMenu()">
						<EpaIcon icon="menu" />
					</button>
				</div>

				<div v-if="isDesktop" id="header_menu" class="ia_column">
					<MainMenu location="header" />
				</div>
			</div>
		</div>

		<div id="mobilemenu" v-if="!isDesktop" :class="[openMobileMenu ? 'open' : '']">
			<div class="mobile_menu_inner">
				<MainMenu location="mobilemenu" animation="true" search="true" info="true" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
import MainMenu from '@/components/menu/MainMenu.vue'
import EpaButton from '@/components/ui/EpaButton.vue'
import { isDesktop, isTablet, openMobileMenu, toggleMobileMenu } from '@/functions/functions'
import EpaIcon from '@/components/ui/EpaIcon.vue'
import SearchToggle from '@/components/ui/SearchToggle.vue'
import Search from '@/components/ui/Search.vue'
</script>

<style scoped lang="scss">
#header {
	background-color: $primary-color;
	color: $color_white;
	z-index: 999;
	position: relative;

	.ia_section {
		padding: 1.5rem 0;

		.ia_row {
			padding: 0;
			gap: $gap_sm;
			align-items: center;

			@media only screen and (max-width: $screen-lm) {
				grid-template-columns: auto auto;

				#header_logo,
				#header_info {
					grid-column: initial;
				}
			}
		}

		#header_logo {
			grid-column: span 3;
		}

		#header_info {
			grid-column: span 9;
			display: flex;
			align-items: center;
			gap: $gap_sm;
			justify-content: end;
		}

		.mobilemenubutton {
			border: 0;
			background: transparent;
			color: #fff;
			padding: 1rem;
			margin-right: -1rem;
			cursor: pointer;

			svg {
				display: block;
			}
		}
	}

	#mobilemenu {
		visibility: hidden;
	}

	&.mobile {
		.ia_section {
			height: 7.5rem;
			align-items: center;
			display: grid;
			padding: 0;
			position: relative;
			z-index: 2;
			background-color: $primary-color;
		}

		#mobilemenu {
			width: 100%;
			height: calc(100vh - 7.5rem);
			overflow-y: auto;
			overflow-x: hidden;
			position: absolute;
			top: 100%;
			z-index: 1;
			background-color: $primary-color;
			transform: translateY(-100%);
			transition: 500ms;
			padding: 4rem;

			&.open {
				visibility: visible;
				transform: translateY(0);

				.mobile_menu_inner {
					.mobile_menu_info {}
				}
			}

			.mobile_menu_inner {
				display: grid;
				gap: $gap;

				.mobile_menu_info {
					display: grid;
					gap: $gap-xs;

					animation-name: inherit;
					animation-duration: 0.5s;
					animation-iteration-count: 1;
					animation-timing-function: ease-in-out;
					animation-fill-mode: both;
					animation-delay: 0ms;
				}
			}
		}
	}
}
</style>
