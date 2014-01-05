
		calcOffense: function() {
			var C = {}, r = 0,
				s = 0,
				n = 0,
				e = 0,
				j = 0,
				p = 0,
				w = 0,
				t = 0,
				B = 0,
				h = 0,
				u = 0,
				g = 0;
			C = _.extend(C, this.applyRubies());
			if (this.attrs.damage) {
				C["dps-mh-min"] = s = this.attrs.damage.min;
				C["dps-mh-max"] = n = this.attrs.damage.max;
				if (this.attrs["damage-oh"]) {
					e = this.attrs["damage-oh"].min;
					j = this.attrs["damage-oh"].max;
					C["dps-oh-min"] = e = this.attrs["damage-oh"].min;
					C["dps-oh-max"] = j = this.attrs["damage-oh"].max
				}
			}
			if (this.attrs["max-damage"]) {
				C["plus-max-damage"] = B = this.attrs["max-damage"];
				n += this.attrs["max-damage"];
				if (j) {
					j += this.attrs["max-damage"]
				}
			}
			if (this.attrs["min-damage"]) {
				C["plus-min-damage"] = p = this.attrs["min-damage"];
				s += this.attrs["min-damage"];
				if (e) {
					e += this.attrs["min-damage"]
				}
			}
			w = (s + n) / 2;
			t = (e + j) / 2;
			C["dps-mh-min-total"] = s;
			C["dps-mh-max-total"] = n;
			if (e && j) {
				C["dps-oh-min-total"] = e;
				C["dps-oh-max-total"] = j
			}
			C["attack-speed-incs"] = this.attrs["attack-speed-incs"] + (this.bonuses["plus-attack-speed"] * 100);
			if (this.attrs["attack-speed-incs"]) {
				r = this.attrs["attack-speed-incs"] / 100
			}
			_.each(["plus-fire-damage", "plus-arcane-damage", "plus-poison-damage", "plus-cold-damage", "plus-lightning-damage", "plus-holy-damage"], function(E, D) {
				if (_.has(this.attrs, E)) {
					u += this.attrs[E]
				}
			}, this);
			C["dps-mh-avg-woele"] = w;
			C["dps-oh-avg-woele"] = t;
			if (this.attrs.mhRealDamage) {
				C["dps-mh-real-min"] = this.attrs.mhRealDamage.min;
				C["dps-mh-real-max"] = this.attrs.mhRealDamage.max;
				C["dps-mh-real-min-bonus"] = this.attrs.mhRealDamage.min + p;
				C["dps-mh-real-max-bonus"] = this.attrs.mhRealDamage.max + B
			}
			if (this.attrs.ohRealDamage) {
				C["dps-oh-real-min"] = this.attrs.ohRealDamage.min;
				C["dps-oh-real-max"] = this.attrs.ohRealDamage.max;
				C["dps-oh-real-min-bonus"] = this.attrs.ohRealDamage.min + p;
				C["dps-oh-real-max-bonus"] = this.attrs.ohRealDamage.max + B
			}
			if (u > 0 && this.attrs.mhRealDamage) {
				h = (this.attrs.mhRealDamage.min + p + this.attrs.mhRealDamage.max + B) / 2 * (u / 100);
				w += h;
				if (this.isDuelWielding) {
					bnEleDamageOh = (this.attrs.ohRealDamage.min + p + this.attrs.ohRealDamage.max + B) / 2 * (u / 100);
					t += bnEleDamageOh;
					C["bonus-elemental-damage-oh"] = bnEleDamageOh
				}
			}
			if (this.bonuses["monk-fitl-bonus"]) {
				w += this.calcFITL(h)
			}
			C["dps-mh-avg"] = w;
			C["dps-oh-avg"] = t;
			C["bonus-elemental-damage"] = h;
			C["bonus-elemental-percent"] = u;
			var z = 1;
			if (this.bonuses["plus-attack-speed-after"]) {
				z += this.bonuses["plus-attack-speed-after"]
			}
			var m, x, o, A, q;
			C["attack-speed-incs-dw"] = " ";
			if (this.isDuelWielding) {
				C["attack-speed-incs-dw"] = " (+15% DW)";
				C["dps-speed"] = {
					mh: this.attrs.speed,
					oh: this.attrs["speed-oh"]
				};
				m = 1 + this.attrs[this.attrs.primary] * 0.01;
				x = 1 + (this.attrs["critical-hit"] * 0.01) * (this.attrs["critical-hit-damage"] * 0.01);
				var f = C["dps-speed"].mh * (1 + r + 0.15 + this.bonuses["plus-attack-speed"]) * z,
					l = C["dps-speed"].oh * (1 + r + 0.15 + this.bonuses["plus-attack-speed"]) * z;
				C["aps-mh"] = f;
				C["aps-oh"] = l;
				o = 2 / (1 / f + 1 / l);
				A = (w + t) / 2;
				q = (1 + this.bonuses["plus-damage"]);
				C.dps = m * x * o * A * q;
				C["dps-speed-mh"] = C["dps-speed"].mh;
				C["dps-speed-oh"] = C["dps-speed"].oh;
				if (this.attrs.mhRealDamage) {
					C["scram-a-mh"] = w * m * q * x
				}
				if (this.attrs.ohRealDamage) {
					C["scram-a-oh"] = t * m * q * x
				}
				C["dps-speed-display"] = Math.round(f * 100000) / 100000 + " MH<br/>" + Math.round(l * 100000) / 100000 + " OH"
			} else {
				C["dps-speed-mh"] = Math.floor(this.attrs.speed * 1024) / 1024;
				m = 1 + this.attrs[this.attrs.primary] * 0.01;
				x = 1 + (this.attrs["critical-hit"] * 0.01) * (this.attrs["critical-hit-damage"] * 0.01);
				o = C["dps-speed-mh"] * (1 + r + this.bonuses["plus-attack-speed"]) * z;
				A = w;
				q = (1 + this.bonuses["plus-damage"]);
				C.dps = m * x * o * A * q;
				C["scram-a-mh"] = A * q * m * x;
				C["dps-speed-display"] = Math.round(o * 1000) / 1000
			}
			C["scram-s"] = m;
			C["scram-c"] = x;
			C["scram-r"] = o;
			C["scram-a"] = A;
			C["scram-m"] = q;
			C["bonus-damage"] = this.bonuses["plus-damage"];
			C["mh-min-damage"] = m * (s + h) * q;
			C["mh-max-damage"] = m * (n + h) * q;
			C["mh-min-damage-crit"] = C["mh-min-damage"] * (1 + (this.attrs["critical-hit-damage"] * 0.01));
			C["mh-max-damage-crit"] = C["mh-max-damage"] * (1 + (this.attrs["critical-hit-damage"] * 0.01));
			if (this.isDuelWielding) {
				C["oh-min-damage"] = m * (e + h) * q;
				C["oh-max-damage"] = m * (j + h) * q;
				C["oh-min-damage-crit"] = C["oh-min-damage"] * (1 + (this.attrs["critical-hit-damage"] * 0.01));
				C["oh-max-damage-crit"] = C["oh-max-damage"] * (1 + (this.attrs["critical-hit-damage"] * 0.01))
			}
			_.each(this.activeSkills, function(G, F) {
				var H = F.split("~");
				if (H[0] == "whirlwind" || F == "sprint~c") {
					if (this.isDuelWielding) {
						var E = 0.7 * C["scram-a-mh"],
							D = 0.4833 * ((C["scram-a-mh"] + C["scram-a-oh"]) / 2),
							I = (this.tickRate(f) + this.tickRate(l)) / 2;
						C.tdps = (E + D) * I
					} else {
						C.tdps = ((0.7 * C["scram-a-mh"]) + (0.4833 * C["scram-a-mh"])) * this.tickRate(o)
					}
					C["tickRate-mh"] = this.tickRate(f);
					if (this.isDuelWielding) {
						C["tickRate-oh"] = this.tickRate(l)
					}
				}
			}, this);
			if (this.attrs["elite-damage-incs"] && this.attrs["elite-damage-incs"].length) {
				var y = 1;
				_.each(this.attrs["elite-damage-incs"], function(E, D) {
					y *= 1 - (E / 100)
				}, this);
				var d = 1 - y;
				C["dps-elites"] = Math.round(C.dps * (1 + d) * 100) / 100;
				C["tdps-elites"] = C.tdps * (1 + d)
			}
			if (this.attrs["demon-damage-incs"] && this.attrs["demon-damage-incs"].length) {
				var y = 1;
				_.each(this.attrs["demon-damage-incs"], function(E, D) {
					y *= 1 - (E / 100)
				}, this);
				var d = 1 - y;
				C["dps-demon"] = Math.round(C.dps * (1 + d) * 100) / 100;
				C["tdps-demon"] = C.tdps * (1 + d)
			}
			if (this.attrs["demon-damage-incs"] && this.attrs["demon-damage-incs"].length && this.attrs["elite-damage-incs"] && this.attrs["elite-damage-incs"].length) {
				var y = 1;
				_.each(this.attrs["demon-damage-incs"], function(E, D) {
					y *= 1 - (E / 100)
				}, this);
				_.each(this.attrs["elite-damage-incs"], function(E, D) {
					y *= 1 - (E / 100)
				}, this);
				var d = 1 - y;
				C["dps-demon-elite"] = Math.round(C.dps * (1 + d) * 100) / 100;
				C["tdps-demon-elite"] = C.tdps * (1 + d)
			}
			return C
		},